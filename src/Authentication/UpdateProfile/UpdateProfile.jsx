import { AddToDrive } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box, margin } from "@mui/system";
import React, { useContext, useState } from "react";
import { color } from "../../theme";
import "./UpdateProfile.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const { updateEmailAddress, updateCurrentPassword, currentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (password !== newPassword) {
      return setError("password do not match");
    }

    setError("");
    setLoading(true);

    const promises = [];
    setLoading(true);
    setError("");
    if (email !== currentUser.email) {
      promises.push(updateEmailAddress(email));
    }
    if (password) {
      promises.push(updateCurrentPassword(password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(currentUser, "currentuser");
  return (
    <form className="form update" onSubmit={handleSubmit}>
      <p className="form-header">Update Email and Password</p>
      <p className="error">{error}</p>
      <p className="success">{msg}</p>
      <div className="form-input">
        <TextField
          sx={{ width: "100%" }}
          label={"Email"}
          placeholder="Leave blank to keep the same "
          type={"email"}
          defaultValue={currentUser.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-input">
        <TextField
          sx={{ width: "100%" }}
          label={" New Password"}
          type={"password"}
          placeholder="Leave blank to keep the same "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-input">
        <TextField
          sx={{ width: "100%" }}
          label={"Confirm new Password"}
          type={"password"}
          placeholder="Leave blank to keep the same "
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
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
          Update
        </Button>
      </Box>
    </form>
  );
};

export default UpdateProfile;
