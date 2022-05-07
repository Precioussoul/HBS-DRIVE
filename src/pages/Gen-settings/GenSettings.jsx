import {
  AccountBox,
  ChevronLeft,
  ChevronRight,
  DarkMode,
  EmailOutlined,
  FavoriteBorder,
  Language,
  Logout,
  Settings,
  Star,
  StarOutlined,
  Storage,
} from "@mui/icons-material";
import { Button, Switch } from "@mui/material";
import React, { useContext } from "react";
import { color } from "../../theme";
import "./gen-settings.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const GenSettings = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  const navigate = useNavigate();

  return (
    <div className="gen">
      <div className="gen-settings">
        <div className="gen-header">
          <p>Profile</p>
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
        <div className="profiles">
          <div className="profiles-img">
            <img
              src={
                currentUser.photoURL
                  ? currentUser.photoURL
                  : "/images/camera.png"
              }
              alt=""
            />
          </div>
          <div className="profiles-details">
            <div className="profiles-name-email">
              <h3>{currentUser.displayName}</h3>
              <p>{currentUser.email}</p>
            </div>
            <div>
              <Link to={"/acc-settings"}>
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifySelf: "center",
                  }}
                >
                  <Settings sx={{ marginRight: "10px" }} />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <p className="style-bg">Contents</p>

        <div className="contents">
          <p>
            <Storage />
            Storage
          </p>

          <div className="storage">
            <span>{`16 MB of 200 MB Used`}</span>

            <Button
              variant="outlined"
              sx={{
                display: "block",
                borderRadius: 20,
                fontSize: 12,
              }}
            >
              Upgrade Storage
            </Button>
          </div>
        </div>
        <div className="contents 2">
          <p>
            <FavoriteBorder />
            Favorites
          </p>

          <div className="storage">
            <Link to={"/favorite"}>
              <Button
                variant="outlined"
                sx={{
                  // bgcolor:
                  padding: "5px",
                  borderRadius: 5,
                  fontSize: 12,
                  alignSelf: "flex-start",
                }}
              >
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
        <p className="style-bg">Preferences</p>

        <div className="preference">
          <div className="pref 1">
            <p>
              <Language />
              Languages
            </p>

            <div className="storage">
              <Button
                variant="outlined"
                sx={{
                  // bgcolor:
                  padding: "5px",
                  borderRadius: 5,
                  fontSize: 10,
                }}
              >
                English{" "}
              </Button>
            </div>
          </div>
          <div className="pref 2">
            <p>
              <DarkMode />
              Dark Mode
            </p>

            <div className="preference">
              <Switch />
            </div>
          </div>
          <div className="pref 2">
            <p>
              <EmailOutlined />
              Verification status
            </p>

            <div className="preference">
              <Button
                variant="outlined"
                color={currentUser.emailVerified ? "success" : "warning"}
                sx={{
                  // bgcolor:
                  padding: "3px 8px",
                  borderRadius: 5,
                  fontSize: 12,
                }}
              >
                {currentUser.emailVerified ? "verified" : "not verified"}
              </Button>
            </div>
          </div>
          <div className="pref 3">
            <p>
              <AccountBox />
              Switch Accounts
            </p>

            <div className="preference">
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  // bgcolor:
                  padding: "5px",
                  borderRadius: 5,
                  fontSize: 12,
                }}
              >
                <Logout fontSize="medium" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenSettings;
