import { createContext } from "react";
import { contextType } from "../types/shopTypes";

const initialContext: contextType = {
  login: "",
  isLoginned: false,
  customerId: "",
  anonymousId: "",
  cart: null,
  setLogin: () => {},
  setIsLoginned: () => {},
  setCustomerId: () => {},
  setAnonymousId: () => {},
  setCart: () => {},
};

export const ShopContext = createContext(initialContext);
