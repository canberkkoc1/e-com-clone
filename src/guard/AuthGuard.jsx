import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { UserAuth } from "../context/AuthContext";
import LoadingPage from "../pages/LoadingPage";

function AuthGuard({ children }) {
  const userEmail = secureLocalStorage.getItem("user");
  debugger;
  if (userEmail === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthGuard;
