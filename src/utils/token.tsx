import { TokenCache, TokenStore } from "@commercetools/ts-client";

export const tokenCache: TokenCache = {
  get(): TokenStore {
    const tokenStoreJson = localStorage.getItem("Token");
    if (!tokenStoreJson) {
      return {
        token: "",
        expirationTime: 0,
      };
    }

    try {
      const token = JSON.parse(tokenStoreJson);
      return token;
    } catch (e) {
      console.error("Error parsing token from cache", e);
      return {
        token: "",
        expirationTime: 0,
      };
    }
  },
  set(cache: TokenStore): void {
    localStorage.setItem("Token", JSON.stringify(cache));
  },
};
