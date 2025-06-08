import { apiRootUser, apiRootAnonymous } from "./Client";

export const addItemToCart = async (
  cartId: string,
  version: number,
  productId: string,
  variantId: number,
  isAuthenticated: boolean
) => {
  const root = isAuthenticated ? apiRootUser : apiRootAnonymous;

  if (!root) {
    throw new Error("API client is not initialized");
  }

  const response = await root
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: "addLineItem",
            productId,
            variantId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  return response.body;
};
