import { Cloud, Folder as FolderIcon, MoreVert } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./folder.scss";

export default function Folder({ folder }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {folder && (
        <Link
          to={{
            pathname: `/folder/${folder.id}`,
            state: { folder: folder },
          }}
        >
          <div className="folder">
            <div className="folder-icons-wrapper">
              <div className="folder-icons">
                <FolderIcon className="icon-main" />
                <Cloud className=" icon-sub" />
              </div>
            </div>

            <div className="folder-detail">
              <p className="folder-name">{folder.name}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
