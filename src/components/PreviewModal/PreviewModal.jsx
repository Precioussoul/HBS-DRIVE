import React, { useContext, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import FileViewer from "react-file-viewer";
import PDFViewer from "pdf-viewer-reactjs";

import "./PreviewModal.scss";

export default function PreviewModal({
  open,
  handleclose,
  viewFile,
  download,
}) {
  let newFile = { url: "images/recents.png", type: "png" };

  if (viewFile !== undefined) {
    newFile = viewFile;
  }

  let fileResult;
  fileResult = newFile.type.includes("image")
    ? "png"
    : newFile.type && newFile.type.includes("audio")
    ? "mp3"
    : newFile.type && newFile.type.includes("video")
    ? "mp4"
    : newFile.type && newFile.type.includes("pdf")
    ? "pdf"
    : newFile.type && newFile.type.includes("wordprocessingml.document")
    ? "docx"
    : newFile.type && newFile.type.includes("vnd.oasis.opendocument.text")
    ? "docx"
    : newFile.type && newFile.type.includes("msword")
    ? "docx"
    : newFile.type && newFile.type.includes("spreadsheetml.sheet")
    ? "xlsx"
    : newFile.type && newFile.type.includes("csv")
    ? "csv"
    : newFile.type;
  console.log("fileresult", fileResult);

  // switch (newFile.type) {
  //   case "image/jpeg":
  //     fileResult = "jpeg";
  //     break;
  //   case "image/png":
  //     fileResult = "png";
  //     break;
  //   case "image/jfif":
  //     fileResult = "jpeg";
  //     break;
  //   case "video/mp4":
  //     fileResult = "mp4";
  //     break;
  //   case "video/x-matroska":
  //     fileResult = "mkv";
  //     break;
  //   case "audio/mpeg":
  //     fileResult = "mp3";
  //     break;
  //   case "audio/mp3":
  //     fileResult = "mp3";
  //     break;
  //   case "audio/wav":
  //     fileResult = "wav";
  //     break;
  //   case "audio/x-m4a":
  //     fileResult = "mp3";
  //     break;

  //   case "application/pdf":
  //     fileResult = "pdf";
  //     break;
  //   case "application/msword":
  //     fileResult = " docx";
  //     break;
  //   case "application/vnd.oasis.opendocument.text": //odt
  //     fileResult = " docx";
  //     break;
  //   case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": //word
  //     fileResult = "docx";
  //     break;
  //   case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //word
  //     fileResult = "xslx";
  //     break;
  //   case "application/vnd.ms-powerpoint": // ppt
  //     fileResult = "ppt";
  //     break;

  //   case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx // ppt
  //     fileResult = "ppt";
  //     break;

  //   default:
  //     fileResult = "OtherType";
  // }

  const file = newFile.url;
  const type = fileResult;

  if (open === true) {
    var btn1 = document.querySelectorAll(".is-black")[0];
    var btn3 = document.querySelectorAll(".is-black")[2];

    if (btn1 !== undefined) {
      setInterval(function () {
        btn1.innerHTML = "Prev";
        btn3.innerHTML = "Next";
      }, 1000);
    }
  }

  const DownloadIfError = () => {
    return (
      <div className="error-component">
        <p className="type-error">file type not supported</p>
        <p>You can download the file Instead</p>
        <Button onClick={download} variant="contained">
          Download
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleclose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,.7)" } }}
    >
      <Box
        className="forDocOnly"
        sx={{
          width: { xs: "95vw", sm: "800px" },
          height: { xs: "50vh", sm: "600px" },
          backgroundColor: "inherit",
          overflowY: "scroll",
        }}
      >
        {fileResult === "pdf" ? (
          <PDFViewer
            document={{
              url: newFile.url,
            }}
            css="pdf-container"
            canvasCss="pdf-view"
            hideZoom={true}
            hideRotation={true}
            // hideNavbar={true}
          />
        ) : (
          <FileViewer
            key={newFile}
            fileType={type}
            filePath={file}
            unsupportedComponent={DownloadIfError}
          />
        )}
      </Box>
    </Modal>
  );
}
