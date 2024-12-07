import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || user?.role !== "owner") {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default OwnerRoute;
