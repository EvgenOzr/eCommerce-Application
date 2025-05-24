import { createContext } from "react";
import { contextType } from "../types/shopTypes";

const initialContext: contextType = {
  login: "",
  isLoginned: false,
  customerId: "",
  setLogin: () => {},
  setIsLoginned: () => {},
  setCustomerId: () => {},
};

export const ShopContext = createContext(initialContext);
