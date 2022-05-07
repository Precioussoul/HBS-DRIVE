import { Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteFolder } from "../../firebase/firebase";
import { color } from "../../theme";
import "./deleteAcc.scss";

const DeleteAcc = () => {
  const { currentUser, deleteUserAccount } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      deleteUserAccount(currentUser).then(() => {
        navigate("/login");
        deleteFolder(currentUser);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleclose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="user-acc">
      <Typography
        variant="p"
        color={color.textColor}
        sx={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          fontSize: 16,
        }}
      >
        <p>Danger Zone - </p>
        <br />
      </Typography>
      <Divider sx={{ border: "1px solid red" }} />
      <div className="delete-acc">
        <p>Delete Account: </p>

        <Button
          onClick={handleOpen}
          sx={{
            bgcolor: "red",
          }}
          variant="contained"
        >
          Delete Account
        </Button>
      </div>
      <div className="modal-delete">
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
            <div className="modal-acc">
              <p>
                Your account will be deleted immediately and permanently. Once
                deleted, accounts can not be restored.
              </p>

              <span className="modal-close" onClick={handleclose}>
                x
              </span>
            </div>
            <p className={"modal-p"}>
              <b>Do you still want to delete account</b>
            </p>

            <div className="form-buttons">
              <Button type="reset" variant="outlined" onClick={handleclose}>
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained">
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteAcc;
