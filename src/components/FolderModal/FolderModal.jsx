import React, { useContext, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import "./Modal.scss";
import { databaseRef } from "../../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { FolderContext } from "../../contexts/FolderContext";
import { AuthContext } from "../../contexts/AuthContext";
import useFolder, { ROOT_FOLDER } from "../../hooks/useFolder";
import { useParams } from "react-router-dom";

export default function FolderModal({ open, handleclose }) {
  const { folderName, setFolderName } = useContext(FolderContext);
  const { folder_Id } = useParams();
  const { folder } = useFolder(folder_Id);
  const { currentUser } = useContext(AuthContext);

  const currentFolder = folder;

  console.log("folder name", folderName);
  console.log("currentFolder", currentFolder);

  const handleFolder = (e) => {
    e.preventDefault();
    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    // create a folder in our database

    addDoc(databaseRef.foldersRef, {
      name: folderName,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
      createdAt: databaseRef.timestamp,
    });

    setFolderName("");
    handleclose();
  };

  return (
    <Modal open={open} onClose={handleclose}>
      <Box
        sx={{
          width: { xs: "90vw", sm: 520 },
          height: { xs: "35vh", sm: 250 },
          backgroundColor: "#fff",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          padding: { xs: 1.5, sm: 2 },
          borderRadius: 5,
          margin: "auto",
        }}
      >
        <div className="modal-header">
          <h3 className="modal-title">New Folder</h3>
          <span className="modal-close" onClick={handleclose}>
            x
          </span>
        </div>
        <form onSubmit={handleFolder}>
          <div className="form-input">
            <TextField
              placeholder="Folder name ..."
              style={{ width: "100%" }}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <Button type="reset" variant="outlined" onClick={handleclose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleFolder}>
              Create
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
