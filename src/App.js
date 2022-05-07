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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route exact path="" element={<Dashboard />} />
              <Route path="trash" element={<Trash />} />
              <Route path="recents" element={<Recents />} />
              <Route path="favorite" element={<Favorites />} />
              <Route path="search" element={<Search />} />
              <Route path="acc-settings" element={<AccSettings />} />
              <Route path="gen-settings" element={<GenSettings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
