import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
