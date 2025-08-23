// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for the presence of an authentication token in local storage
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the child components (the protected page)
  return children;
};

export default ProtectedRoute;
