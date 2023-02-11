import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BestSellerContextProvider } from "./context/BestSeller";
import { CartsContextProvider } from "./context/GetCarts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BestSellerContextProvider>
      <CartsContextProvider>
        <App />
      </CartsContextProvider>
    </BestSellerContextProvider>
  </AuthContextProvider>
);
