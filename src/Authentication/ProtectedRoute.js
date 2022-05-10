import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Layout from "../Layouts/Layout";
import Login from "./Login/Login";
import AddButton from "../components/AddButton/AddButton.jsx";
import SimplePortal from "../components/SimplePortal";

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser !== null ? (
    <Layout>
      <Outlet />
      <AddButton />
      <SimplePortal />
    </Layout>
  ) : (
    <Login />
  );
};

export default ProtectedRoute;
