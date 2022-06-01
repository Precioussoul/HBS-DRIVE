import React, { useContext, useEffect, useState } from "react";
import {
  AccountBox,
  AccountBoxOutlined,
  ArrowCircleLeft,
  Cancel,
  DarkMode,
  DarkModeOutlined,
  FullscreenExitOutlined,
  GridOn,
  LanguageOutlined,
  LightbulbCircle,
  LightbulbCircleTwoTone,
  LightMode,
  ListOutlined,
  LogoutOutlined,
  NotificationsNoneOutlined,
  PeopleAltOutlined,
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
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { blue, deepPurple } from "@mui/material/colors";
import { color } from "../../theme";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import { ThemeContext } from "../../App";

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
  const { mode, setMode } = useContext(ThemeContext);
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
    navigate("/");
  };

  return (
    <div className="navbar">
      <form className={`nav-search ${mode}`} onSubmit={handleSubmit}>
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
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          placeholder="  Search in Drive"
        />

        {cancel && (
          <button type="submit" className="search-btn">
            <Search color="primary" />
          </button>
        )}
      </form>
      <div className={`greeting ${mode}`}>
        <span>
          Welcome <span className="grt-lg">Back</span>,{" "}
        </span>
        <Typography
          noWrap
          sx={{
            width: { sm: "70px", xl: "120px" },
            display: "inline-block",
            marginLeft: 1.5,
          }}
        >
          {username}
        </Typography>
        👋
      </div>
      <div className={`nav-items-wrapper ${mode}`}>
        <div className="nav-items">
          <div className="item">
            <LanguageOutlined className="icon" />
            english
          </div>
          <div className="item">
            {mode === "dark" ? (
              <DarkMode className="icon" onClick={() => setMode("light")} />
            ) : (
              <LightMode className="icon" onClick={() => setMode("dark")} />
            )}
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
              <MenuItem className="menu-item" onClick={handleClose}>
                <PeopleAltOutlined />
                <p>Profile</p>
              </MenuItem>
            </Link>
            <Link to={"acc-settings"}>
              <MenuItem className="menu-item" onClick={handleClose}>
                <AccountBoxOutlined />
                <p> Manage Account</p>
              </MenuItem>
            </Link>
            <MenuItem className="menu-item" onClick={handleClose}>
              <span>
                {mode === "light" ? (
                  <DarkMode className="icon" />
                ) : (
                  <LightMode className="icon" />
                )}
              </span>
              {mode === "light" ? (
                <span onClick={() => setMode("dark")}>Dark Mode</span>
              ) : (
                <span onClick={() => setMode("light")}>Light Mode</span>
              )}
            </MenuItem>
            <MenuItem onClick={handleLogout} className="menu-item">
              <LogoutOutlined />
              <p>Logout</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
