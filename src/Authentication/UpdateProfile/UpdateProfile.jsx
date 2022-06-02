import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import "./UpdateProfile.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const { updateEmailAddress, updateCurrentPassword, currentUser } =
    useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
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
    if (newPassword === password) {
      promises.push(updateCurrentPassword(newPassword));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("please log out to verify or try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(currentUser, "currentuser");
  return (
    <form className={`form update ${mode}`} onSubmit={handleSubmit}>
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
