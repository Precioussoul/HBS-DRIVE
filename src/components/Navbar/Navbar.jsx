import React, { useContext } from "react";
import {
  ArrowCircleLeft,
  Cancel,
  DarkModeOutlined,
  FullscreenExitOutlined,
  GridOn,
  LanguageOutlined,
  LightbulbCircle,
  LightbulbCircleTwoTone,
  LightMode,
  ListOutlined,
  NotificationsNoneOutlined,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { blue, deepPurple } from "@mui/material/colors";
import { color } from "../../theme";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";

const CancelSearch = styled(Box)(({ theme, state }) => ({
  display: state ? "flex" : "none",
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cancel, setCancel] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const { logout, currentUser } = useContext(AuthContext);
  const { setSearchQuery } = useContext(FileAndFolderContext);
  const username = currentUser.displayName
    ? currentUser.displayName
    : currentUser.email;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setCancel(true);
    navigate("/search");
  };
  const closeSearch = () => {
    setCancel(false);
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.value = "";
  };
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <div className="navbar">
      <form className="nav-search" onSubmit={handleSubmit}>
        {/* <SearchOutlined className="icon" /> */}
        {cancel ? (
          <CancelSearch state={cancel} onClick={closeSearch}>
            <ArrowCircleLeft fontSize="large" color="primary" />
          </CancelSearch>
        ) : (
          <Search color="primary" />
        )}
        <InputBase
          onClick={handleSearch}
          sx={{ width: "100%" }}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="  Search in Drive"
        />

        {cancel && (
          <button type="submit" className="search-btn">
            <Search color="primary" />
          </button>
        )}
      </form>
      <div className="greeting dark">
        <p>
          {" "}
          <span>Hi {username} 👋</span>
        </p>
      </div>
      <div className="nav-items-wrapper">
        <div className="nav-items">
          <div className="item">
            <LanguageOutlined className="icon" />
            english
          </div>
          <div className="item">
            <LightMode className="icon" />
          </div>
          <div className="item"></div>
        </div>
        {/* nav item ends here */}

        <div>
          <Avatar
            src={currentUser.photoURL ? currentUser.photoURL : ""}
            alt={
              currentUser.displayName
                ? currentUser.displayName[0]
                : currentUser.email[0]
            }
            sx={{ border: ".5px solid #1a22fc", bgcolor: blue[900] }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to={"gen-settings"}>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link to={"acc-settings"}>
              <MenuItem>Account Settings</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
