import { useState } from "react";
import { ShopContext } from "./shopContext";

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [login, setLogin] = useState("");
  const [isLoginned, setIsLoginned] = useState(() => {
    return Boolean(localStorage.getItem("Token"));
  });

  return (
    <ShopContext.Provider
      value={{ login, isLoginned, setLogin, setIsLoginned }}
    >
      {children}
    </ShopContext.Provider>
  );
};
