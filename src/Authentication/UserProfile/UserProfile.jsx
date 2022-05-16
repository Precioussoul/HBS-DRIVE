import { AddToDrive } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  avatarURL,
  result,
  resultUrl,
  uploadAvatar,
} from "../../firebase/firebase";
import { color } from "../../theme";
import "./userProfile.scss";

const UserProfile = () => {
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setLoading(false);
  };

  console.log("file", file);
  console.log(currentUser, " current user");
  const fullname = firstName + " " + lastName;

  //   save files to cloud

  if (file !== undefined || file !== "") {
    uploadAvatar(file, currentUser);
  }

  function handleSaveChange(e) {
    e.preventDefault();

    //   get dowload url
    setTimeout(() => {
      avatarURL(file, currentUser, setError, setMessage, setLoading, setFile);
    }, 2000);
    //  console.log("downloaded url", downloadedUrl);
    if (result !== undefined) {
      setPhoto(result);
      updateUserProfile(fullname, result, setError, navigate);
    }
    setFile("");

    // setError("your changes has been saved");
  }

  return (
    <div>
      <form className="user-acc dark" onSubmit={handleSaveChange}>
        <p className="user-acc__pro-title">Update Name or Profile Image</p>
        <p className="error">{error}</p>
        <p className="success">{message}</p>
        <div className="user">
          <p>First Name</p>
          <TextField
            sx={{
              width: { xs: "80%", sm: "80%" },
            }}
            label="First name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="user">
          <p>Last Name</p>
          <TextField
            sx={{
              width: { xs: "80%", sm: "80%" },
            }}
            label="Last name"
            placeholder="Enter Last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="user">
          <p>Profile Image</p>
          <input
            type="file"
            id="file"
            className="profile-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="div-upload">
            <div className="img-upl">
              <img src={photo !== "" ? photo : "images/camera.png"} alt="" />
            </div>
            <div className="upload-btns">
              <Button
                sx={{
                  display: "block",
                  marginBottom: { xs: "20px", sm: "10px" },
                }}
                variant="outlined"
              >
                <label htmlFor="file"> Upload Image</label>
              </Button>
              <Button
                sx={{ display: "block", margin: "10px 0" }}
                variant="outlined"
                color="warning"
                onClick={() => setFile("")}
              >
                Remove Image
              </Button>
            </div>
          </div>
        </div>
        <div className="save-change">
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              textAlign: "end",
              width: { xs: "50%" },
              margin: "auto",
              bgcolor: color.primaryColor1,
            }}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
