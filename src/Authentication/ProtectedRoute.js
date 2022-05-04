import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = true;
  return (
    <div>
      return currentUser ? <Outlet /> : <Navigate to="/login" />;
    </div>
  );
};

export default ProtectedRoute;
