import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LoadingPage from "../pages/LoadingPage";

function AuthGuard({ children }) {
  const { user, loading } = UserAuth();

  if (loading) {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthGuard;
