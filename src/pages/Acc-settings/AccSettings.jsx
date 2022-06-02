import React, { useState } from "react";
import UpdateProfile from "../../Authentication/UpdateProfile/UpdateProfile";
import UserProfile from "../../Authentication/UserProfile/UserProfile";
import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";

import { color } from "../../theme";
import "./acc-setting.scss";
import VerifyEmail from "../../Authentication/verifyEmail/VerifyEmail";
import DeleteAcc from "../../Authentication/deleteAccount/DeleteAcc";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AccSettings() {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setLoading(true);
  };

  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          minHeight: "100vh",
          width: "100%",
          // backgroundImage: 'url("/images/bubble.webp")',
        }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={loading}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity={loading ? "success" : "warning"}
            sx={{ width: "100%" }}
          >
            welcome back
          </Alert>
        </Snackbar>
        <div className="acc-header">
          <Typography
            variant="p"
            color={color.textColor}
            sx={{
              alignSelf: "flex-start",
              marginBottom: "20px",
              fontSize: 20,
            }}
          >
            <b>Account settings -</b>
            <br />
            <small>
              you can view and update your account details, profiles and more
            </small>
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              // bgcolor:
              padding: "5px",
              borderRadius: 5,
              fontSize: 12,
              alignSelf: "flex-start",
            }}
          >
            <ChevronLeft />
          </Button>{" "}
        </div>
        <Divider />
        <div className="settings-view">
          <UpdateProfile />
          <UserProfile />
          <VerifyEmail />
          <DeleteAcc />
        </div>
      </Box>
    </div>
  );
}
