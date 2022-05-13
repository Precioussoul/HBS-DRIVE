import { MoreVert } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../contexts/FavoriteContext";
import ACTIONS from "../../reducers/action";

import "./File.scss";

export default function File({ file }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dispatch, favoredFiles } = useContext(FavoritesContext);
  let star = JSON.parse(localStorage.getItem("starred"));
  console.log("starred", star);

  const [starred, setStarred] = useState(star);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    localStorage.setItem("starred", JSON.stringify(starred));
  }, [starred]);

  const toggleFavorites = (e) => {
    e.stopPropagation();

    if (favoredFiles.length > 0) {
      favoredFiles.forEach((favor) => {
        if (favor.id === file.id) {
          dispatch({
            type: ACTIONS.REMOVE_FROM_FAVORITES,
            id: file.id,
          });
        }
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_TO_FAVORITES,
        file,
      });
      setStarred(!starred);
    }
  };

  let fileResult;

  switch (file.type) {
    case "image/jpeg":
      fileResult = file.url;
      break;
    case "image/png":
      fileResult = file.url;
      break;
    case "video/mp4":
      fileResult = "images/mp4.png";
      break;
    case "video/x-matroska":
      fileResult = "images/mkv.png";
      break;
    case "audio/mpeg":
      fileResult = "images/mp3.png";
      break;
    case "audio/wav":
      fileResult = "images/wav.png";
      break;
    case "audio/x-m4a":
      fileResult = "images/m4a.png";
      break;
    case "application/x-zip-compressed":
      fileResult = "images/zip.png";
      break;
    case "application/pdf":
      fileResult = "images/pdf.png";
      break;
    case "application/msword":
      fileResult = "images/docs.png";
      break;
    case "application/vnd.oasis.opendocument.text": //odt
      fileResult = "images/docs.png";
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": //word
      fileResult = "images/docs.png";
      break;
    case "application/vnd.ms-powerpoint": // ppt
      fileResult = "images/ppt.png";
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx // ppt
      fileResult = "images/ppt.png";
      break;
    case "text/plain":
      fileResult = "images/txt.png";
      break;
    case "text/html":
      fileResult = "images/html.png";
      break;
    case "text/css":
      fileResult = "images/css.png";
      break;
    case "text/javascript":
      fileResult = "images/js.png";
      break;

    default:
      fileResult = "images/otherFile.png";
  }

  return (
    <>
      {file && (
        <div className="file">
          <a
            href={file.url}
            download
            target={"_blank"}
            className="file-information"
          >
            <div className="file-img">
              <img src={fileResult} alt={file.name} />
            </div>
            <Typography
              noWrap
              fontSize={14}
              sx={{
                width: "50%",
              }}
            >
              {file.name}
            </Typography>
            <Typography noWrap fontSize={14}>
              {file.size} MB
            </Typography>
          </a>
          <div className="file-menu">
            <IconButton
              id="file-options"
              sx={{
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="file-options"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Preview</MenuItem>
              <MenuItem onClick={toggleFavorites}>
                {starred ? "Starred" : "Add a star"}
              </MenuItem>
              <MenuItem onClick={handleClose}>Get shareable link</MenuItem>
              <MenuItem>
                <a href={file.url} download target={"_blank"}>
                  Download
                </a>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}
