import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { color } from "../../theme";
import "./verify.scss";

const VerifyEmail = () => {
  const { currentUser, verifyEmailAddress } = useContext(AuthContext);
  const [msg, setMsg] = useState();

  const handleVerify = (e) => {
    e.preventDefault();
    verifyEmailAddress(currentUser, setMsg);
  };
  return (
    <div className="main-div">
      <Typography
        variant="p"
        color={color.textColor}
        sx={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          fontSize: 16,
        }}
      >
        <p>Email verification status -</p>
        <br />
      </Typography>
      <form className="user-acc" onSubmit={handleVerify}>
        <p> {currentUser.displayName}</p>
        <p className="user-acc__pro-title">
          {currentUser.emailVerified
            ? "Congratulation, you have been verified"
            : "Please verify your email address "}
        </p>
        {/* <p className="error">{error}</p> */}
        {/* <p className="success">{message}</p> */}
        {!currentUser.emailVerified && (
          <div className="please-verify">
            <p className="success">{msg}</p>
            <Button variant="contained">click to verify email</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;
