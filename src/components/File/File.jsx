import {
  CheckCircleOutlined,
  CloudDownloadOutlined,
  DeleteForever,
  DeleteOutlined,
  History,
  LinkOutlined,
  MoreVert,
  Close,
  Star,
  StarBorder,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./File.scss";
import useFolder, { ROOT_FOLDER } from "../../hooks/useFolder";
import { useParams } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { databaseRef, storage } from "../../firebase/firebase";
import Axios from "axios";
import fileDownload from "js-file-download";
import { deleteObject, ref } from "firebase/storage";
import { ThemeContext } from "../../App";
import PreviewModal from "../PreviewModal/PreviewModal";

export default function File({ file, fromTrash }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const open = Boolean(anchorEl);
  const { folder_Id } = useParams();
  const { folder } = useFolder(folder_Id);
  const [openPrev, setOpenPrev] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const handleClosePrev = () => {
    setOpenPrev(false);
  };
  const handleCloseNotify = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotify(false);
  };

  let currentFolder;

  if (folder) {
    currentFolder = folder;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const previewFile = () => {
    setOpenPrev(true);
    handleClose();
  };

  function download(url, filename) {
    Axios.get(url, {
      responseType: "blob",
    }).then((res) => {
      fileDownload(res.data, filename);
    });
    handleClose();
  }

  const favRef = doc(databaseRef.filesRef, file.id);

  const addToFavorites = () => {
    updateDoc(favRef, {
      isStarred: true,
    });
    handleClose();
  };
  const removeFavorites = () => {
    updateDoc(favRef, {
      isStarred: false,
    });
    handleClose();
  };

  let filePath;
  if (currentFolder) {
    filePath =
      currentFolder.name === ROOT_FOLDER.name
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${file.folderName}/${file.name}`;
  }

  const fileRef = ref(storage, `files/${currentUser.uid}/${filePath}`); //storage

  const permanentDelete = () => {
    deleteDoc(doc(databaseRef.filesRef, file.id));
    deleteObject(fileRef);
    handleClose();
  };

  const trashRef = doc(databaseRef.filesRef, file.id);

  const updateTrash = () => {
    setOpenNotify(true);

    updateDoc(trashRef, {
      isTrashed: true,
    });
    handleClose();
  };
  const undoTrash = () => {
    updateDoc(trashRef, {
      isTrashed: false,
    });
    handleClose();
  };

  let fileResult;

  fileResult = file.type.includes("image")
    ? file.url
    : "images/otherFile.png" && file.type.includes("audio")
    ? "images/music.png"
    : "images/" && file.type.includes("video")
    ? "images/videos.png"
    : "images/otherFile.png" && file.type.includes("pdf")
    ? "images/pdf.png"
    : "images/otherFile.png" && file.type.includes("wordprocessingml.document")
    ? "images/docs.png"
    : "images/otherFile.png" &&
      file.type.includes("vnd.oasis.opendocument.text")
    ? "images/docs.png"
    : "images/otherFile.png" && file.type.includes("msword")
    ? "images/docs.png"
    : "images/otherFile.png" && file.type.includes("spreadsheetml.sheet")
    ? "images/xls.png"
    : "images/otherFile.png" && file.type.includes("powerpoint")
    ? "images/ppt.png"
    : "otherFile.png" && file.type.includes("presentationml.presentation")
    ? "images/ppt.png"
    : "images/otherFile.png" && file.type.includes("plain")
    ? "images/txt.png"
    : "images/otherFile.png" && file.type.includes("html")
    ? "images/html.png"
    : "images/otherFile.png" && file.type.includes(" css")
    ? "images/css.png"
    : "images/otherFile.png" && file.type.includes("javascript")
    ? "images/js.png"
    : "images/otherFile.png" && file.type.includes("compressed")
    ? "images/zip.png"
    : "images/otherFile.png" && file.type.includes("csv")
    ? "images/xls.png"
    : "images/otherFile.png";

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseNotify}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseNotify}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {file && (
        <div className={`file ${mode}`}>
          <div className="file-information">
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="file-img"
            >
              <img src={fileResult} alt={file.name} />
            </a>
            <Typography
              noWrap
              fontSize={14}
              sx={{
                width: "45%",
              }}
            >
              {file.name}
            </Typography>
            <Typography noWrap fontSize={14}>
              {file.size} MB
            </Typography>
          </div>
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
              <MenuItem onClick={previewFile} className={"menu-item"}>
                <VisibilityOutlined />
                Preview
              </MenuItem>
              <MenuItem
                onClick={file.isStarred ? removeFavorites : addToFavorites}
                className={"menu-item"}
                sx={{
                  display: fromTrash ? "none" : "flex",
                  visibility: fromTrash ? "hidden" : "visible",
                }}
              >
                {file.isStarred ? <Star /> : <StarBorder />}
                {file.isStarred ? "Starred" : "Add a star"}
              </MenuItem>
              <CopyToClipboard text={file.url} onCopy={() => setCopied(true)}>
                <MenuItem
                  className="menu-item"
                  sx={{
                    display: fromTrash ? "none" : "flex",
                    visibility: fromTrash ? "hidden" : "visible",
                  }}
                >
                  {copied ? <CheckCircleOutlined /> : <LinkOutlined />}
                  {copied ? "Copied" : "Get link"}
                </MenuItem>
              </CopyToClipboard>

              <MenuItem
                className="menu-item"
                onClick={() => download(file.url, file.name)}
                sx={{
                  display: fromTrash ? "none" : "flex",
                  visibility: fromTrash ? "hidden" : "visible",
                }}
              >
                <CloudDownloadOutlined />
                <p> Download</p>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={file.isTrashed ? undoTrash : updateTrash}
                className="menu-item"
              >
                {file.isTrashed ? <History /> : <DeleteOutlined />}

                {file.isTrashed ? "Restore" : "Delete"}
              </MenuItem>
              <MenuItem
                onClick={permanentDelete}
                sx={{
                  display: fromTrash ? "flex" : "none",
                  visibility: fromTrash ? "visible" : "hidden",
                }}
                className="menu-item"
              >
                <DeleteForever />
                <p>Permanent Delete</p>
              </MenuItem>
            </Menu>
          </div>
          {file && (
            <PreviewModal
              open={openPrev}
              handleclose={handleClosePrev}
              viewFile={file}
              download={() => download(file.url, file.name)}
            />
          )}

          <Snackbar
            open={openNotify}
            autoHideDuration={6000}
            onClose={handleCloseNotify}
            message={`${file.name} has been moved to Trash`}
            action={action}
          />
        </div>
      )}
    </>
  );
}
