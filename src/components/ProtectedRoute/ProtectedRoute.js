import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { loggedIn, uniqueProp } = props;

  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;
