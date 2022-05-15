import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Favorites from "./pages/Favorites/Favorites";
import Recents from "./pages/Recents/Recents";
import Trash from "./pages/Trash/Trash";
import { theme } from "./theme";
import Search from "./pages/Search/Search.jsx";
import Login from "./Authentication/Login/Login.jsx";
import SignUp from "./Authentication/Signup/SignUp.jsx";
import ForgetPassword from "./Authentication/ForgetPassword/ForgetPassword.jsx";
import ProtectedRoute from "./Authentication/ProtectedRoute.js";
import AuthProvider from "./contexts/AuthContext.js";
import AccSettings from "./pages/Acc-settings/AccSettings";
import GenSettings from "./pages/Gen-settings/GenSettings.jsx";
import FolderDetails from "./pages/FolderDetails/FolderDetails.jsx";
import FileAndFolderProvider from "./contexts/FileAndFolderContext.js";
import OtherFilesFilter from "./pages/Others/OtherFilesFilter.jsx";
import ImageFilter from "./pages/Images/ImageFilter.jsx";
import VideoFilter from "./pages/Videos/VideoFilter.jsx";
import AudioFilter from "./pages/Audios/AudioFilter.jsx";
import DocsFilter from "./pages/Documents/DocsFilter.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FileAndFolderProvider>
          <Router>
            <Routes>
              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route exact path="" element={<Dashboard />} />
                <Route path="/folder/:folder_Id" element={<FolderDetails />} />
                <Route path="trash" element={<Trash />} />
                <Route path="recents" element={<Recents />} />
                <Route path="favorite" element={<Favorites />} />
                <Route path="search" element={<Search />} />
                <Route path="acc-settings" element={<AccSettings />} />
                <Route path="gen-settings" element={<GenSettings />} />
                <Route path="documents" element={<DocsFilter />} />
                <Route path="audios" element={<AudioFilter />} />
                <Route path="videos" element={<VideoFilter />} />
                <Route path="images" element={<ImageFilter />} />
                <Route path="others" element={<OtherFilesFilter />} />
              </Route>
            </Routes>
          </Router>
        </FileAndFolderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
