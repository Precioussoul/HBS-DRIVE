import React, { useContext } from "react";
import { Box, Modal } from "@mui/material";
import FileViewer from "react-file-viewer";
import "./PreviewModal.scss";

export default function PreviewModal({ open, handleclose, viewFile }) {
  let newFile = { url: "images/recents.png", type: "png" };

  if (viewFile !== undefined) {
    newFile = viewFile;
  }

  let fileResult;

  switch (newFile.type) {
    case "image/jpeg":
      fileResult = "jpeg";
      break;
    case "image/png":
      fileResult = "png";
      break;
    case "image/jfif":
      fileResult = "jpeg";
      break;
    case "video/mp4":
      fileResult = "mp4";
      break;
    case "video/x-matroska":
      fileResult = "mkv";
      break;
    case "audio/mpeg":
      fileResult = "mp3";
      break;
    case "audio/wav":
      fileResult = "wav";
      break;
    case "audio/x-m4a":
      fileResult = "mp3";
      break;

    case "application/pdf":
      fileResult = "pdf";
      break;
    case "application/msword":
      fileResult = " docx";
      break;
    case "application/vnd.oasis.opendocument.text": //odt
      fileResult = " docx";
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": //word
      fileResult = "docx";
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //word
      fileResult = "xslx";
      break;
    case "application/vnd.ms-powerpoint": // ppt
      fileResult = "ppt";
      break;

    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx // ppt
      fileResult = "ppt";
      break;

    default:
      fileResult = "images/otherFile.png";
  }

  const file = newFile.url;
  const type = fileResult;

  var canvas = document.getElementsByTagName("canvas")[0];
  if (canvas) {
    canvas.width = `${100}%`;
    canvas.height = 600;
  }

  var canvas2 = document.getElementsByTagName("canvas")[1];
  if (canvas2) {
    canvas2.width = 600;
    canvas2.height = 300;
  }
  return (
    <Modal
      open={open}
      onClose={handleclose}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,.7)" } }}
    >
      <Box
        sx={{
          width: { xs: "95vw", sm: "60%" },
          height: { xs: "50vh", sm: "60%" },
          backgroundColor: "inherit",
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          padding: { xs: 1.5, sm: 2 },
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FileViewer key={newFile} fileType={type} filePath={file} />
      </Box>
    </Modal>
  );
}
