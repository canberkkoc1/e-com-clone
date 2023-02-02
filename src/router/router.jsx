import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import AuthGuard from "../guard/AuthGuard";

const Router = () => {
  const pageRoutes = routes.map(({ path, title, component }) => {
    //! if(path === 'home') return <Route key={title} path={`/${path}`} element={<AuthGuard>{component}</AuthGuard>} />;
    return <Route key={title} path={`/${path}`} element={component} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
