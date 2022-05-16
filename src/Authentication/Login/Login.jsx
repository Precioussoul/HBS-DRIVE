import { AddToDrive } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box, margin } from "@mui/system";
import React, { useContext, useState } from "react";
import { color } from "../../theme";
import "./Login.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser(email, password, setError, setLoading);
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "auto",
        minHeight: "100vh",
        // backgroundImage: 'url("/images/darkBg.webp")',
        backgroundColor: "background.default",
        color: "text.color",
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
      <form className="form dark" onSubmit={handleSubmit}>
        <p className="form-header">Enter your login details</p>
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

        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Continue
          </Button>
        </Box>
      </form>
      <div className="account dark">
        <Link to="/forgot-password">Forget Password</Link>
      </div>
      <div className="account dark">
        <p>Don't have an account ?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </Box>
  );
};

export default Login;
