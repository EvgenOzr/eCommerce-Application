import React from "react";
import { contextType } from "../types/shopTypes";

export const initialContext: contextType = {
  login: "",
  isLoginned: false,
};

const ShopContext = React.createContext(initialContext);

export default ShopContext;
