import React, { useContext } from "react";
import "./trash.scss";
import File from "../../components/File/File";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import { ThemeContext } from "../../App";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Folder from "../../components/Folders/Folder";
import useFolder, { ROOT_FOLDER } from "../../hooks/useFolder";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { databaseRef, storage } from "../../firebase/firebase";

export default function Trash() {
  const [empty, setEmpty] = React.useState(true);
  const navigate = useNavigate();
  const { folder_Id } = useParams();
  const { folder } = useFolder(folder_Id);
  const { allFiles, allFolders, loading } = useContext(FileAndFolderContext);
  const { mode } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

  const trashFiles = allFiles.filter((file) => file.isTrashed === true);
  const trashFolders = allFolders.filter((folder) => folder.isTrashed === true);

  let fromTrash = false;

  if (trashFiles.length > 0) {
    fromTrash = true;
  }

  const currentFolder = folder;
  let filePath;

  const emptyTrashFiles = () => {
    trashFiles.forEach((file) => {
      if (currentFolder) {
        filePath =
          currentFolder.name === ROOT_FOLDER.name
            ? `${currentFolder.path.join("/")}/${file.name}`
            : `${file.folderName}/${file.name}`;
      }
      const fileRef = ref(storage, `files/${currentUser.uid}/${filePath}`); //storage

      deleteDoc(doc(databaseRef.filesRef, file.id));
      deleteObject(fileRef);
    });
  };
  const emptyTrashFolders = () => {
    trashFolders.forEach((folder) => {
      deleteDoc(doc(databaseRef.foldersRef, folder.id));
    });
  };

  const emptyAllTrash = () => {
    emptyTrashFiles();
    emptyTrashFolders();
  };

  return (
    <>
      {loading ? (
        <div>
          <div className={`recent-header ${mode} `}>
            <p>Trash</p>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                // bgcolor:
                padding: "5px",
                borderRadius: 5,
                fontSize: 12,
                alignSelf: "flex-start",
              }}
            >
              <ChevronLeft />
            </Button>{" "}
          </div>
          <Divider
            sx={{ display: { sm: "none" }, visibility: { sm: "hidden" } }}
          />
          <div className={`trash-notice ${mode}`}>
            <Typography sx={{ width: { xs: "60%" }, fontSize: { xs: 14 } }}>
              Items in trash are deleted forever after 30 days
            </Typography>
            <Button variant="text" onClick={emptyAllTrash}>
              <Typography
                noWrap
                fontSize={14}
                sx={{ width: { xs: "70%", sm: "100%" } }}
              >
                empty trash
              </Typography>
            </Button>
          </div>
          {!trashFiles.length > 0 && !trashFolders.length > 0 ? (
            <div className="trash">
              <img src="/images/trash.png" alt="" />
              <h3>Trash is Empty</h3>
              <p>there is no file or folder in your trash currently</p>
            </div>
          ) : (
            <div className="trash-view">
              {trashFiles.map((itemTrash) => (
                <File
                  key={itemTrash.id}
                  file={itemTrash}
                  fromTrash={fromTrash}
                />
              ))}
              {trashFolders.map((itemTrash) => (
                <Folder key={itemTrash.id} folder={itemTrash} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
