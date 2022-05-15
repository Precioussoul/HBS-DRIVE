import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import useFolder from "../../hooks/useFolder";
import "./recents.scss";

export default function Recents() {
  const navigate = useNavigate();
  const { allFiles, allFolders } = useContext(FileAndFolderContext);

  return (
    <div>
      <div className="recent-header">
        <p>Recent files</p>
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
      <Divider sx={{ display: { sm: "none" }, visibility: { sm: "hidden" } }} />
      {allFiles.length > 0 && allFolders.length > 0 && (
        <div className="recents-view">
          {allFolders.map((childFolder) => (
            <div className="recent-details" key={childFolder.id}>
              <Folder folder={childFolder} />
              <p>Uploaded on</p>
              <p>{childFolder.createdAt.toDate().toDateString()}</p>
            </div>
          ))}
          {allFiles.map((childFile) => (
            <div className="recent-details" key={childFile.id}>
              <File file={childFile} />
              <p>Uploaded on</p>
              <p>{childFile.createdAt.toDate().toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// <div>
// Recents
// <Button onClick={() => navigate(-1)}>Go back</Button>
// </div>
