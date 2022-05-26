import { AddToDrive } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { color } from "../../theme";
import "./SignUp.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const { signupUser, verifyEmailAddress, currentUser } =
    useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (password !== confirmPassword) {
      return setError("password do not match");
    }

    try {
      setError("");
      setLoading(true);
      signupUser(email, password);

      navigate("/login");
    } catch {
      setError("Failed to sign in user, check credentials");
      setLoading(false);
    }
  };

  console.log(currentUser, "currentuser");
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
      {/* <Typography
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
      </Typography> */}
      <div className="hbs-logo">
        <img src="/images/hbs-logo.png" alt="Hbs Drive" />
      </div>
      <form className={`form ${mode}`} onSubmit={handleSubmit}>
        <p className="form-header">Sign up for new account</p>
        <p className="error">{error}</p>
        <p className="success">{msg}</p>
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
            placeholder="password must be atleast 6 character"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-input">
          <TextField
            sx={{ width: "100%" }}
            label={"Confirm Password"}
            type={"password"}
            placeholder="password must be atleast 6 character"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </Button>
        </Box>
      </form>
      <div className={`account ${mode}`}>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div className={`account ${mode}`}>
        <p>Already have an account ?</p>
        <Link to="/login">Log in</Link>
      </div>
    </Box>
  );
};

export default SignUp;
