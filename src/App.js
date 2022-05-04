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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
