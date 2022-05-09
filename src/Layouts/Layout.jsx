import * as React from "react";
import PropTypes from "prop-types";
import { color } from "../theme";
import "./Layout.scss";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  IconButton,
  Divider,
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import {
  AccessTime,
  Dashboard,
  Delete,
  Settings,
  StarOutline,
  Menu,
  AddToDrive,
  CloudUploadOutlined,
  CloudUpload,
  CreateNewFolder,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Storage from "../components/StorageProgress/Storage";
import UploadFiles from "../components/uploadCenter/Upload";
import FolderModal from "../components/FolderModal/FolderModal";

const drawerWidth = 210;
const drawerWidth2 = 270;
const xlWidth = 320;

const customWidthXL = drawerWidth + xlWidth;
const customWidthMd = 480;

function Layout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = [
    {
      text: "My Drive",
      icon: <Dashboard color="primary" />,
      path: "/",
    },
    {
      text: "Recents",
      icon: <AccessTime color="primary" />,
      path: "/recents",
    },
    {
      text: "Favorites",
      icon: <StarOutline color="primary" />,
      path: "/favorite",
    },
    {
      text: "Trash",
      icon: <Delete color="primary" />,
      path: "/trash",
    },
    {
      text: "Settings",
      icon: <Settings color="primary" />,
      path: "/gen-settings",
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          component={"span"}
          color={color.primaryColor2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AddToDrive sx={{ color: color.primaryColor2 }} />
          HBS Drive
        </Typography>
      </Toolbar>
      <Divider />
      <div className="btn-upload">
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "5px",
          }}
        >
          <label htmlFor="new" className="upload-label">
            <CloudUpload />
          </label>
          <p>Upload</p>
        </Button>
        <input type="file" id="new" className="upload-new" />
        <Button
          sx={{ marginRight: "5px" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          <CreateNewFolder />
        </Button>
      </div>
      <FolderModal open={open} handleclose={handleClose} />
      <List>
        {menuItems.map((item, indx) => (
          <ListItem
            button
            key={indx}
            onClick={() => navigate(item.path)}
            sx={{
              marginBottom: { xl: 2 },
              backgroundColor: pathname === item.path ? "#a3a9df" : null,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box
        sx={{
          height: { xs: " auto", sm: "auto" },
          padding: "20px 5px",
        }}
      >
        <div className="upgrade-img">
          <img src="/images/rocket.png" alt="" />
        </div>
        <p className="upgrade-desc">
          Upgrade to <b>pro</b> for unlimited storage{" "}
        </p>
        <span className="upgrade-link">Upgrade Now</span>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    //   main box
    <>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px) ` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              visibility: { sm: "hidden" },
              width: {
                sm: `calc(100% - ${drawerWidth}px)`,
              },
            }}
          >
            <Menu color="primary" fontSize="large" />
          </IconButton>
          <Navbar />
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        {/* navbar/appbar */}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
              zIndex: (theme) => theme.zIndex.drawer + 2,
            }}
          >
            {drawer}
          </Drawer>{" "}
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* navbar/appbar ends here */}

        {/* middle box */}
        <Box
          component="main"
          sx={{
            // flexGrow: 1,
            p: 2,
            width: {
              xs: "100%",
              lg: `calc(100% - ${customWidthMd}px)`,
              xl: `calc(100% - ${customWidthXL}px)`,
            },
          }}
        >
          <Toolbar />
          {children}
        </Box>

        {/* middle box ends here */}

        <Box>
          <Drawer
            variant="permanent"
            anchor="right"
            sx={{
              display: { xs: "none", lg: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: { sm: drawerWidth2, xl: xlWidth },
              },
              visibility: { xs: "hidden", lg: "visible" },
            }}
            open
          >
            <Box>
              <Toolbar />
              <Storage />
              <UploadFiles />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
