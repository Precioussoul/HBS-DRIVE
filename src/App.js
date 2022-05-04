import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Favorites from "./pages/Favorites/Favorites";
import Recents from "./pages/Recents/Recents";
import Settings from "./pages/Settings";
import Trash from "./pages/Trash/Trash";
import Layout from "./Layouts/Layout";
import { theme } from "./theme";
import Search from "./pages/Search/Search.jsx";
import AddButton from "./components/AddButton/AddButton.jsx";
import Login from "./Authentication/Login/Login.jsx";
import SignUp from "./Authentication/Signup/SignUp.jsx";
import ForgetPassword from "./Authentication/ForgetPassword/ForgetPassword.jsx";
import ProtectedRoute from "./Authentication/ProtectedRoute.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route element={<ProtectedRoute />}>
              <React.Fragment>
                <Layout>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/recents" element={<Recents />} />
                  <Route path="/favorite" element={<Favorites />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/search" element={<Search />} />
                  <AddButton />
                </Layout>
              </React.Fragment>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

{
  /* <Router>
        <React.Fragment>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/recents" element={<Recents />} />
              <Route path="/favorite" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            <AddButton />
          </Layout>
        </React.Fragment>
      </Router> */
}

// <Route exact path="/" element={<Dashboard />} />
// <Route exact path="/folder/:folderId" element={<Dashboard />} />
// {/* user profile */}
// <Route path="/user" element={<Profile />} />
// <Route path="/update_profile" element={<UpdateProfile />} />
