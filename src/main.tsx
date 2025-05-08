import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegPage from "./pages/RegistrationPage/RegPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>
);
