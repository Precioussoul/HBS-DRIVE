import React from "react";
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
import { useNavigate } from "react-router-dom";

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
          onChange={(e) => console.log(e.target.value)}
        />
        {/* <CancelSearch state={cancel} onClick={closeSearch}>
          <ArrowCircleLeft fontSize="large" />
        </CancelSearch> */}
        {cancel && (
          <button type="submit" className="search-btn">
            <Search color="primary" />
          </button>
        )}
        {/* <input type="text" placeholder="Search...." className="input-search" /> */}
      </form>
      <div className="greeting">
        <p>
          {" "}
          <span>Hi Sofiyullah 👋</span>
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
            src="/images/project-1-4.jpg"
            sx={{ border: ".5px solid #1a22fc" }}
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
