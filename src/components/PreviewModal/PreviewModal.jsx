import React from "react";
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
          width: { xs: "90vw", sm: "60vw", xl: "50vw" },
          height: { xs: "50vh", sm: "50vh" },
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
