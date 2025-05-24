import { useState } from "react";
import { ShopContext } from "./shopContext";

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [login, setLogin] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isLoginned, setIsLoginned] = useState(() => {
    return Boolean(localStorage.getItem("Token"));
  });

  return (
    <ShopContext.Provider
      value={{
        login,
        isLoginned,
        customerId,
        setLogin,
        setIsLoginned,
        setCustomerId,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
