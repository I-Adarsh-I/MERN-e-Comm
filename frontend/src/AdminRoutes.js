import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.user);

  if (!userInfo.isAdmin) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default AdminRoutes;
