import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import useFolder from "../../hooks/useFolder";
import "./recents.scss";

export default function Recents() {
  const navigate = useNavigate();
  const { folder_Id } = useParams();
  const { childFolders, childFiles } = useFolder(folder_Id);

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
      {childFiles.length > 0 && childFolders.length > 0 && (
        <div className="recents-view">
          {childFolders.map((childFolder) => (
            <div className="recent-details" key={childFolder.id}>
              <Folder folder={childFolder} />
              <p>Uploaded on</p>
              <p>{childFolder.createdAt.toDate().toDateString()}</p>
            </div>
          ))}
          {childFiles.map((childFile) => (
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
