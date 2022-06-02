import React, { useContext, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";

import {
  AccessTime,
  Dashboard,
  Delete,
  Settings,
  StarOutline,
  Menu,
  CloudUpload,
  CreateNewFolder,
} from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Storage from "../components/StorageProgress/Storage";
import UploadFiles from "../components/uploadCenter/Upload";
import FolderModal from "../components/FolderModal/FolderModal";
import useFolder, { ROOT_FOLDER } from "../hooks/useFolder";
import { databaseRef, storage } from "../firebase/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FileAndFolderContext } from "../contexts/FileAndFolderContext";
import LinearProgressWithLabel from "../components/LinearProgressBar";
import { ThemeContext } from "../App";

const drawerWidth = 210;
const drawerWidth2 = 270;
const xlWidth = 320;

const customWidthXL = drawerWidth + xlWidth;
const customWidthMd = 480;

function Layout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { folder_Id } = useParams();
  const { folder } = useFolder(folder_Id);
  const { currentUser } = React.useContext(AuthContext);
  const { mode } = React.useContext(ThemeContext);
  const {
    setUpFile,
    setUploadingFiles,
    handleCloseShow,
    setError,
    fullSpace,
    show,
    uploadingFiles,
    upfile,
  } = useContext(FileAndFolderContext);

  const currentFolder = folder;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMultipleFileUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;

    const fileArr = [];
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
    }

    fileArr.forEach((file) => {
      setUpFile(file);
      const defaultFileValue = file.size / 1024 / 1024;
      const fileSize = `${Math.round(defaultFileValue * 100) / 100}`;

      if (currentFolder == null || file == null) return;
      const id = uuidV4();
      handleCloseShow();

      setUploadingFiles((prevState) => [
        ...prevState,
        { id: id, name: file.name, progress: 0, error: false },
      ]);

      const filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${file.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${
              file.name
            }`;

      const fileRef = ref(storage, `files/${currentUser.uid}/${filePath}`);

      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadingFiles((prevState) => {
            return prevState.map((uploadFile) => {
              if (uploadFile.id === id) {
                return { ...uploadFile, progress: progress };
              }
              return uploadFile;
            });
          });
        },
        () => {
          setUploadingFiles((prevState) => {
            return prevState.filter((uploadFile) => {
              if (uploadFile.id === id) {
                setError(true);
                return { ...uploadFile, error: true };
              }
              return uploadFile;
            });
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              const q = query(
                databaseRef.filesRef,
                where("name", "==", file.name),
                where("folderId", "==", currentFolder.id),
                where("userId", "==", currentUser.uid)
              );

              getDocs(q).then((existingFiles) => {
                const existingFile = existingFiles.docs[0];
                if (existingFile) {
                  const existRef = ref(existingFile);
                  updateDoc(existRef, {
                    url: downloadUrl,
                  });
                } else {
                  addDoc(databaseRef.filesRef, {
                    name: file.name,
                    size: fileSize,
                    type: file.type,
                    url: downloadUrl,
                    isStarred: false,
                    isTrashed: false,
                    folderId: currentFolder.id,
                    folderName: currentFolder.name,
                    userId: currentUser.uid,
                    createdAt: databaseRef.timestamp,
                  });
                }
              });
            })
            .then(() => {
              setUploadingFiles((prevState) => {
                return prevState.filter((uploadFile) => {
                  return uploadFile.id !== id;
                });
              });
              setUpFile("");
              setUploadingFiles([]);
            });
        }
      );
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUpFile(file);
    const defaultFileValue = file.size / 1024 / 1024;
    const fileSize = `${Math.round(defaultFileValue * 100) / 100}`;

    if (currentFolder == null || file == null) return;
    const id = uuidV4();
    handleCloseShow();

    setUploadingFiles((prevState) => [
      ...prevState,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const fileRef = ref(storage, `files/${currentUser.uid}/${filePath}`);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadingFiles((prevState) => {
          return prevState.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevState) => {
          return prevState.filter((uploadFile) => {
            if (uploadFile.id === id) {
              setError(true);
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            const q = query(
              databaseRef.filesRef,
              where("name", "==", file.name),
              where("folderId", "==", currentFolder.id),
              where("userId", "==", currentUser.uid)
            );

            getDocs(q).then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                const existRef = ref(existingFile);
                updateDoc(existRef, {
                  url: downloadUrl,
                });
              } else {
                addDoc(databaseRef.filesRef, {
                  name: file.name,
                  size: fileSize,
                  type: file.type,
                  url: downloadUrl,
                  isStarred: false,
                  isTrashed: false,
                  folderId: currentFolder.id,
                  folderName: currentFolder.name,
                  userId: currentUser.uid,
                  createdAt: databaseRef.timestamp,
                });
              }
            });
          })
          .then(() => {
            setUploadingFiles((prevState) => {
              return prevState.filter((uploadFile) => {
                return uploadFile.id !== id;
              });
            });
            setUpFile("");
          });
      }
    );
  };

  const menuItems = [
    {
      text: "My Drive",
      icon: <Dashboard color={mode === "dark" ? "secondary" : "primary"} />,
      path: "/",
    },
    {
      text: "Recents",
      icon: <AccessTime color={mode === "dark" ? "secondary" : "primary"} />,
      path: "/recents",
    },
    {
      text: "Favorites",
      icon: <StarOutline color={mode === "dark" ? "secondary" : "primary"} />,
      path: "/favorite",
    },
    {
      text: "Trash",
      icon: <Delete color={mode === "dark" ? "secondary" : "primary"} />,
      path: "/trash",
    },
    {
      text: "Settings",
      icon: <Settings color={mode === "dark" ? "secondary" : "primary"} />,
      path: "/gen-settings",
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          component={"span"}
          color={mode === "dark" ? "text.color" : color.primaryColor2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {/* <AddToDrive
            sx={{ color: mode === "dark" ? "text.color" : color.primaryColor2 }}
          /> */}
          <div className="hbs-logo layout">
            <img src="/images/hbs-logo.png" alt="Hbs Drive" />
          </div>
          Hbs Drive
        </Typography>
      </Toolbar>
      <Divider />
      {fullSpace ? (
        <div>
          <p className="error">
            Your Space is Full, please upgrade or Delete Files
          </p>
        </div>
      ) : (
        <div className="btn-upload">
          <Button
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <label htmlFor="new" className="upload-label">
              <CloudUpload />
              <p>Upload</p>
            </label>
          </Button>
          <input
            type="file"
            id="new"
            className="upload-new"
            onChange={handleFileUpload}
          />
          <Button
            sx={{ marginRight: "5px" }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            <CreateNewFolder />
          </Button>
        </div>
      )}
      <FolderModal open={open} handleclose={handleClose} />
      <List>
        {menuItems.map((item, indx) => (
          <ListItem
            button
            key={indx}
            onClick={() => navigate(item.path)}
            sx={{
              marginBottom: { xl: 2 },
              backgroundColor:
                pathname === item.path
                  ? mode === "dark"
                    ? "#292929"
                    : "#a3a9df"
                  : null,
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
          backgroundColor: "background.default",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: mode === "dark" ? "1px solid blue" : "1px solid #ddd",
          color: "text.primary",
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

      <Box
        sx={{ display: "flex" }}
        color="text.primary"
        bgcolor={"Background.default"}
      >
        {/* navbar/appbar */}

        <Box
          component="nav"
          color="text.secondary"
          bgcolor={"Background.default"}
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
          color="text.primary"
          bgcolor={"Background.default"}
          sx={{
            p: 2,
            width: {
              xs: "99%",
              lg: `calc(100% - ${customWidthMd}px)`,
              xl: `calc(100% - ${customWidthXL}px)`,
            },
            overflow: "hidden !important",
          }}
          className="layout-mobile"
        >
          <Toolbar />
          <>
            {uploadingFiles.length > 0 &&
              uploadingFiles.map((file) => (
                <Snackbar
                  ref={container}
                  open={show}
                  color="success"
                  onClose={handleCloseShow}
                  key={file.id}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{ width: "320px" }}
                >
                  <Alert
                    severity={file.error ? "warning" : "success"}
                    sx={{ width: "100%" }}
                    variant="standard"
                    onClose={() => {
                      setUploadingFiles((prevState) => {
                        return prevState.filter((uploadFile) => {
                          return uploadFile.id !== file.id;
                        });
                      });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 5px",
                        alignItems: "center",
                      }}
                    >
                      <Typography noWrap sx={{ width: "150px" }}>
                        {upfile.name}
                      </Typography>
                    </Box>
                    <LinearProgressWithLabel value={file.progress} />
                  </Alert>
                </Snackbar>
              ))}
          </>

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

              {fullSpace ? (
                <div>
                  <Typography className="error">
                    Your Space is Full, please upgrade or delete some files
                  </Typography>
                </div>
              ) : (
                <UploadFiles
                  handleMultipleFileUpload={handleMultipleFileUpload}
                />
              )}
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
