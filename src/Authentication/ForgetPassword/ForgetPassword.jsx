import { AddToDrive } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { color } from "../../theme";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    try {
      setError("");
      setLoading(true);
      resetPassword(email);
    } catch {
      setError("email doesn't match our record");
      setLoading(false);
    }
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
        backgroundImage: 'url("/images/bubble.webp")',
      }}
    >
      <Typography
        variant="h6"
        component={"span"}
        color={color.primaryColor2}
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          fontSize: 30,
        }}
      >
        <AddToDrive sx={{ color: color.primaryColor2, fontSize: 60 }} />
        HBS Drive
      </Typography>
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-header"> Reset Password</p>
        <p className="error">{error}</p>
        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Email"}
            type={"email"}
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
      <div className="account">
        <Link to="/login">Login instead</Link>
      </div>
      <div className="account">
        <p>Don't have an account ?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </Box>
  );
};

export default ForgetPassword;
