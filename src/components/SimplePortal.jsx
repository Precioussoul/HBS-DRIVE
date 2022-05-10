import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";
import { Alert, Snackbar } from "@mui/material";
import { FileAndFolderContext } from "../contexts/FileAndFolderContext";
import LinearProgressWithLabel from "./LinearProgressBar";

export default function SimplePortal() {
  const { show, uploadingFiles, setUploadingFiles, upfile, handleCloseShow } =
    useContext(FileAndFolderContext);
  const container = React.useRef(null);

  console.log("uploading", uploadingFiles);

  return (
    <>
      {uploadingFiles.length > 0 &&
        uploadingFiles.map((file) => (
          <Snackbar
            ref={container}
            open={show}
            color="success"
            onClose={handleCloseShow}
            key={file.id}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ width: "300px" }}
          >
            <Alert
              severity={file.error ? "warning" : "success"}
              sx={{ width: "100%" }}
              variant="standard"
              onClose={() => {
                setUploadingFiles((prevState) => {
                  return prevState.filter((uploadFile) => {
                    return uploadFile.id !== file.id;
                  });
                });
              }}
            >
              <p>{upfile.name}</p>
              <LinearProgressWithLabel value={file.progress} />
            </Alert>
          </Snackbar>
        ))}
    </>
  );
}
