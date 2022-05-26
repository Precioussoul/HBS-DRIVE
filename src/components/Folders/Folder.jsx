import {
  Cloud,
  DeleteForever,
  DeleteOutlined,
  Folder as FolderIcon,
  History,
  MoreVert,
  RestoreFromTrashOutlined,
  Star,
  StarBorder,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { databaseRef, storage } from "../../firebase/firebase";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./folder.scss";
import { ThemeContext } from "../../App";

export default function Folder({ folder }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { mode } = useContext(ThemeContext);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fromFav = true;

  const favRef = doc(databaseRef.foldersRef, folder.id);

  const addToFavorites = () => {
    updateDoc(favRef, {
      isStarred: true,
    });
  };
  const removeFavorites = () => {
    updateDoc(favRef, {
      isStarred: false,
    });
  };

  const permanentDelete = () => {
    deleteDoc(doc(databaseRef.foldersRef, folder.id));
  };

  const trashRef = doc(databaseRef.foldersRef, folder.id);

  const updateTrash = () => {
    updateDoc(trashRef, {
      isTrashed: true,
    }).then(() => {});
  };

  const undoTrash = () => {
    updateDoc(trashRef, {
      isTrashed: false,
    });
  };

  return (
    <>
      {folder && (
        <div className="folder">
          <Link
            to={{
              pathname: `/folder/${folder.id}`,
              state: { folder: folder },
            }}
          >
            <div className="folder-icons-wrapper">
              <div className="folder-icons">
                <FolderIcon className={`icon-main ${mode}`} />
                <Cloud className={`icon-sub ${mode}`} />
                <Star
                  className={`icon-starred ${mode}`}
                  sx={{
                    display: folder.isStarred ? "block" : "none",
                  }}
                />
              </div>
            </div>
          </Link>
          <div className="folder-detail">
            <p className={`folder-name ${mode}`}>{folder.name}</p>
            <div className="folder-menu folder-name">
              <IconButton
                id="folder-options"
                sx={{
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="folder-options"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => navigate(`/folder/${folder.id}`)}
                  className={"menu-item"}
                >
                  <VisibilityOutlined />
                  Open
                </MenuItem>
                <MenuItem
                  onClick={folder.isStarred ? removeFavorites : addToFavorites}
                  className={"menu-item"}
                  sx={{
                    display: folder.isTrashed ? "none" : "flex",
                    visibility: folder.isTrashed ? "hidden" : "visible",
                  }}
                >
                  {folder.isStarred ? <Star /> : <StarBorder />}
                  {folder.isStarred ? "Starred" : "Add a star"}
                </MenuItem>

                <Divider />
                <MenuItem
                  onClick={folder.isTrashed ? undoTrash : updateTrash}
                  className="menu-item"
                >
                  {folder.isTrashed ? <History /> : <DeleteOutlined />}

                  {folder.isTrashed ? "Restore" : "Delete"}
                </MenuItem>
                <MenuItem
                  onClick={permanentDelete}
                  sx={{
                    display: folder.isTrashed ? "flex" : "none",
                    visibility: folder.isTrashed ? "visible" : "hidden",
                  }}
                  className="menu-item"
                >
                  <DeleteForever />
                  <p>Permanent Delete</p>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
