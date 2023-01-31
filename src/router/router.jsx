import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from ".";

const Router = () => {
  const pageRoutes = routes.map(({ path, title, component }) => {
    return <Route key={title} path={`/${path}`} element={component} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
