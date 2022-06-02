import { AddToDrive } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { AuthContext } from "../../contexts/AuthContext";
import { color } from "../../theme";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const { mode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    resetPassword(email).catch(() => {
      setError("Email doesn't match our record");
      setLoading(false);
      setTimeout(() => {
        setError(" ");
      }, 3000);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        minHeight: "100vh",
        backgroundImage:
          mode === "dark"
            ? 'url("/images/bubble-dark.webp")'
            : 'url("/images/bubble.webp")',
        color: mode === "dark" ? "text.color" : "inherit",
      }}
    >
      <div className="hbs-logo">
        <img src="/images/hbs-logo.png" alt="Hbs Drive" />
      </div>

      <form className={`form ${mode}`} onSubmit={handleSubmit}>
        <p className="form-header"> Reset Password</p>
        <p className="error">{error}</p>
        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Email"}
            type={"email"}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "50%" }}
            disabled={loading}
            disableElevation={loading}
          >
            Submit
          </Button>
        </Box>
      </form>
      <div className={`account ${mode}`}>
        <Link to="/login">Login instead</Link>
      </div>
      <div className={`account ${mode}`}>
        <p>Don't have an account ?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </Box>
  );
};

export default ForgetPassword;
