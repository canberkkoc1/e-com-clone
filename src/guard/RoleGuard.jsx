import React from "react";
import { UserAuth } from "../context/AuthContext";
import Page404 from "../pages/Page404";

function RoleGuard({ children }) {
  const { user } = UserAuth();

  if (user?.email === "admin@admin.com") {
    return children;
  }
  return <Page404 />;
}

export default RoleGuard;
