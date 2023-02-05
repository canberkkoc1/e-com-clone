import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import AuthGuard from "../guard/AuthGuard";
import RoleGuard from "../guard/RoleGuard";

const Router = () => {
  const pageRoutes = routes.map(({ path, title, component }) => {
    if (path === "" || path === "userprofile")
      return (
        <Route
          key={title}
          path={`/${path}`}
          element={<AuthGuard>{component}</AuthGuard>}
        />
      );
    /* Role Guard */
    if (path === "dashboard") {
      return (
        <Route
          key={title}
          path={`/${path}`}
          element={<RoleGuard>{component}</RoleGuard>}
        />
      );
    }

    return <Route key={title} path={`/${path}`} element={component} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
