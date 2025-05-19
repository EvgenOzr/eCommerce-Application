import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegPage from "./pages/RegistrationPage/RegPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ShopProvider } from "./context/contextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShopProvider>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ShopProvider>
  </StrictMode>
);
