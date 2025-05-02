import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import LoginPage from "./pages/LoginPage/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <h1>Hello World!!!</h1> */}
    <LoginPage />
  </StrictMode>
);
