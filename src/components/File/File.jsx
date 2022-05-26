import {
  CheckCircleOutlined,
  CloudDownload,
  CloudDownloadOutlined,
  DeleteForever,
  DeleteOutlined,
  History,
  LinkOutlined,
  MoreVert,
  Preview,
  PreviewOutlined,
  RestoreFromTrashOutlined,
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
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
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

  const handleClosePrev = () => {
    setOpenPrev(false);
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
  };

  function download(url, filename) {
    Axios.get(url, {
      responseType: "blob",
    }).then((res) => {
      fileDownload(res.data, filename);
    });
  }

  const favRef = doc(databaseRef.filesRef, file.id);

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
  };

  const trashRef = doc(databaseRef.filesRef, file.id);

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

  let fileResult;

  switch (file.type) {
    case "image/jpeg":
      fileResult = file.url;
      break;
    case "image/png":
      fileResult = file.url;
      break;
    case "image/jfif":
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
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //word
      fileResult = "images/xls.png";
      break;
    case "application/vnd.ms-powerpoint": // ppt
      fileResult = "images/ppt.png";
      break;
    case "application/x-msdownload": // ppt
      fileResult = "images/exe.png";
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
        <div className={`file ${mode}`}>
          <div className="file-information">
            <a href={file.url} target="_blank" className="file-img">
              <img src={fileResult} alt={file.name} />
            </a>
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
              >
                {file.isStarred ? <Star /> : <StarBorder />}
                {file.isStarred ? "Starred" : "Add a star"}
              </MenuItem>
              <CopyToClipboard text={file.url} onCopy={() => setCopied(true)}>
                <MenuItem className="menu-item">
                  {copied ? <CheckCircleOutlined /> : <LinkOutlined />}
                  {copied ? "Copied" : "Get link"}
                </MenuItem>
              </CopyToClipboard>

              <MenuItem
                className="menu-item"
                onClick={() => download(file.url, file.name)}
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
            />
          )}
        </div>
      )}
    </>
  );
}
