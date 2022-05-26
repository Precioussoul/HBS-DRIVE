import React, { useContext } from "react";
import "./trash.scss";
import File from "../../components/File/File";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import { ThemeContext } from "../../App";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Folder from "../../components/Folders/Folder";

export default function Trash() {
  const [empty, setEmpty] = React.useState(true);
  const navigate = useNavigate();
  const { allFiles, allFolders, loading } = useContext(FileAndFolderContext);
  const { mode } = useContext(ThemeContext);

  const trashFile = allFiles.filter((file) => file.isTrashed === true);
  const trashFolder = allFolders.filter((folder) => folder.isTrashed === true);

  let fromTrash = false;

  if (trashFile.length > 0) {
    fromTrash = true;
  }

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
          {trashFile.length > 0 ||
            (trashFolder.length > 0 && (
              <div className="trash-notice">
                <Typography sx={{ width: { xs: "60%" }, fontSize: { xs: 14 } }}>
                  Items in trash are deleted forever after 30 days
                </Typography>
                <Button>Empty Trash</Button>
              </div>
            ))}
          {!trashFile.length > 0 && !trashFolder.length > 0 ? (
            <div className="trash">
              <img src="/images/trash.png" alt="" />
              <h3>Trash is Empty</h3>
              <p>there is no file or folder in your trash currently</p>
            </div>
          ) : (
            <div className="trash-view">
              {trashFile.map((itemTrash) => (
                <File
                  key={itemTrash.id}
                  file={itemTrash}
                  fromTrash={fromTrash}
                />
              ))}
              {trashFolder.map((itemTrash) => (
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
