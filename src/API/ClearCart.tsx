import { ClearCartParams } from "../types/shopTypes";
import { apiRootUser, apiRootAnonymous } from "./Client";

export const clearCart = async ({
  cartId,
  cartVersion,
  isAuthenticated,
}: ClearCartParams) => {
  const root = isAuthenticated ? apiRootUser : apiRootAnonymous;

  if (!root) {
    throw new Error("API client is not initialized");
  }

  const currentCart = await root
    .me()
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute();

  const actions = currentCart.body.lineItems.map((item) => ({
    action: "removeLineItem" as const,
    lineItemId: item.id,
  }));

  if (actions.length === 0) return currentCart.body;

  const response = await root
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions,
      },
    })
    .execute();

  return response.body;
};
