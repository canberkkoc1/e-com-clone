import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiProduct } from "./redux/apiProduct";
import { AuthContextProvider } from "./context/AuthContext";
import { BestSellerContextProvider } from "./context/BestSeller";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BestSellerContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BestSellerContextProvider>
  </AuthContextProvider>
);
