import { Image, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import "./File.scss";

export default function File({ file }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fileType = [
    "image/png",
    "image/png",
    "video/mp4",
    "audio/mpeg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "audio/wav",
    "audio/mpeg4",
    "application/pdf",
    "application/pptx",
  ];
  // let resultFile;
  // switch (file.type) {
  //   case "image/png":
  //     return (resultFile = file.url);
  //     break;
  //   case "image/jpeg":
  //     return (resultFile = file.url);
  //   case "application/pdf":
  //     return (resultFile = "images/pdf.png");
  //     break;
  //   default:
  //     break;
  // }

  return (
    <a href={file.url} download className="file">
      <Card
        sx={{ maxWidth: { xs: 150, sm: 175, xl: 350 } }}
        className="file-bg"
      >
        {/* <CardMedia
          component="img"
          height="140"
          image={
            file.type === "image/jpeg" || "image/png"
              ? file.url
              : "images/camera.png"
          }
          alt={file.name}
        /> */}
        <div className="file-detail">
          <p>{file.name}</p>
          <div className="file-menu">
            <MoreVert
              id="file-menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />{" "}
            <Menu
              id="file-menu"
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
                <a href={file.url} className="download">
                  Download
                </a>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>
    </a>
  );
}
