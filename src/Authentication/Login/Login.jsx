import { AddToDrive } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box, margin } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser(email, password, setError, setLoading, navigate);
  };

  useEffect(() => {
    setPassword("test123");
    setEmail("hbs@demo123.com");
  }, []);

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
        <p className="form-header">Enter your login details</p>
        <p className="error">{error}</p>
        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Email"}
            type={"email"}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Password"}
            type={"password"}
            value={password}
            required
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
      <div className={`account ${mode}`}>
        <Link to="/forgot-password">Forget Password</Link>
      </div>
      <div className={`account ${mode}`}>
        <p>Don't have an account ?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </Box>
  );
};

export default Login;
