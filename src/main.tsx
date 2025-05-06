import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container">
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </div>
  </StrictMode>
);
