import { Cloud, Folder as FolderIcon, MoreVert } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import "./folder.scss";

export default function Folder() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="folder">
      <div className="folder-icons-wrapper">
        <div className="folder-icons">
          <FolderIcon className="icon-main" />
          <Cloud className=" icon-sub" />
        </div>
      </div>

      <div className="folder-detail">
        <p className="folder-name">Behance Post</p>
        <div className="folder-menu">
          <MoreVert
            style={{ cursor: "pointer" }}
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
            <MenuItem onClick={handleClose}>Get shareable link</MenuItem>
            <MenuItem onClick={handleClose}>Add a star</MenuItem>
            <MenuItem onClick={handleClose}>Download</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
