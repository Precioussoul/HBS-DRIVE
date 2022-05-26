import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import "./favorites.scss";

export default function Favorites() {
  const navigate = useNavigate();
  const { loading, fileFavorites, folderFavorites } =
    useContext(FileAndFolderContext);
  const { mode } = useContext(ThemeContext);

  return (
    <>
      {loading ? (
        <div>
          <div className={`recent-header ${mode} `}>
            <p>Favorite files</p>
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
          {!fileFavorites.length > 0 && !folderFavorites.length > 0 ? (
            <div className="favorite">
              <img src="/images/starred.png" alt="" className="fav-img" />
              <h3>Nothing is starred or favoured 💕</h3>
              <p>Add a star to a file and folder</p>
            </div>
          ) : (
            <div className="favorites-view">
              {fileFavorites.map((file) => (
                <File key={file.id} file={file} />
              ))}
              {folderFavorites.map((folder) => (
                <Folder key={folder.id} folder={folder} />
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
