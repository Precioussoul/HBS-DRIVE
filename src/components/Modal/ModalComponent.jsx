import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import "./Modal.scss";

export default function ModalComponent({ open, handleclose }) {
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
        <form>
          <div className="form-input">
            <TextField
              placeholder="Folder name ..."
              style={{ width: "100%" }}
            />
          </div>
          <div className="form-buttons">
            <Button type="reset" variant="outlined" onClick={handleclose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
