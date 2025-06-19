import { useState, useEffect } from "react";
import { ShopContext } from "./shopContext";
import { Cart } from "@commercetools/platform-sdk";
import { createCart } from "../API/CreateCart";
import { getActiveCart } from "../API/GetActiveCart";

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [login, setLogin] = useState("");
  const [customerId, setCustomerId] = useState(() => {
    return localStorage.getItem("customerId") || "";
  });
  const [anonymousId, setAnonymousId] = useState(() => {
    return localStorage.getItem("anonymousId") || "";
  });
  const [isLoginned, setIsLoginned] = useState(() => {
    return Boolean(localStorage.getItem("Token"));
  });
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    async function loadCart() {
      if (!isLoginned && !anonymousId) {
        const newCart = await createCart({});
        if (newCart.anonymousId) {
          setAnonymousId(newCart.anonymousId);
          localStorage.setItem("anonymousId", newCart.anonymousId);
        }
        setCart(newCart);
        return;
      }

      const activeCart = await getActiveCart({
        customerId: isLoginned ? customerId : undefined,
        anonymousId: !isLoginned ? anonymousId : undefined,
      });

      setCart(activeCart);
    }

    loadCart();
  }, [customerId, anonymousId, isLoginned]);

  return (
    <ShopContext.Provider
      value={{
        login,
        isLoginned,
        customerId,
        anonymousId,
        cart,
        setLogin,
        setIsLoginned,
        setCustomerId,
        setAnonymousId,
        setCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
