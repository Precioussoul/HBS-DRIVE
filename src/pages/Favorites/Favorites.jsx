import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import File from "../../components/File/File";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import "./favorites.scss";

export default function Favorites() {
  const navigate = useNavigate();
  const { allFiles } = useContext(FileAndFolderContext);
  let fav = false;
  // if (favorites.length > 0) {
  //   fav = true;
  // }

  const trulyFavorites = allFiles.filter((file) => file.isStarred === true);

  return (
    <div>
      <div className="recent-header">
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
      <Divider sx={{ display: { sm: "none" }, visibility: { sm: "hidden" } }} />
      {!trulyFavorites.length > 0 ? (
        <div className="favorite">
          <img src="/images/starred.png" alt="" className="fav-img" />
          <h3>Nothing is starred or favoured 💕</h3>
          <p>Add a star to a file and folder</p>
        </div>
      ) : (
        <div className="recents-view">
          {trulyFavorites.map((file, index) => (
            <File key={file.id} file={file} index={index} />
            // <p key={file.id}>{file.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}
