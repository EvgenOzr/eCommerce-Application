import { createContext } from "react";
import { contextType } from "../types/shopTypes";

const initialContext: contextType = {
  login: "",
  isLoginned: false,
  setLogin: () => {},
  setIsLoginned: () => {},
};

export const ShopContext = createContext(initialContext);
