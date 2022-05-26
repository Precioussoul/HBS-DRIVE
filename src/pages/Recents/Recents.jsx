import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./recents.scss";

export default function Recents() {
  const navigate = useNavigate();
  const { allFiles, allFolders, loading } = useContext(FileAndFolderContext);
  const { mode } = useContext(ThemeContext);

  return (
    <>
      {loading ? (
        <div>
          <div className={`recent-header ${mode} `}>
            <Typography>Recents activities</Typography>
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
          {!allFiles.length > 0 && !allFolders.length > 0 ? (
            <div className="favorite">
              <img src="/images/recents-act.png" alt="" className="fav-img" />
              <h3>No Activities has been performed Yet </h3>
              <p>Do something, we will record it</p>
            </div>
          ) : (
            <div className="recents-activities-view">
              <div className="folders-view">
                {allFolders.map((childFolder) => (
                  <div className="recent-details">
                    <Folder key={childFolder.id} folder={childFolder} />
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
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

// <div>
// Recents
// <Button onClick={() => navigate(-1)}>Go back</Button>
// </div>
