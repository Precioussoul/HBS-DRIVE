import { MoreVert } from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "./FileList.scss";
export default function FileList({ file }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    <div className="filelist">
      <div className="filelist-info">
        <div className="filelist-img">
          <img src={fileResult} alt="" />
        </div>
        <div className="filelist-type">
          <p>{file.name}</p>
          <p className="filelist-size-m">{file.size} MB</p>
        </div>
      </div>
      <span className="filelist-size-d">{file.size} MB</span>
      <span className="filelist-date">
        {file.createdAt.toDate().toDateString()}
      </span>
      <span className="filelist-owner"> Riszy Lancelot</span>
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
          <MenuItem onClick={handleClose}>Add a star</MenuItem>
          <MenuItem onClick={handleClose}>Get shareable link</MenuItem>
          <MenuItem>
            <a href="3" download target={"_blank"}>
              Download
            </a>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
