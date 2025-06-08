import { apiRootUser, apiRootAnonymous } from "./Client";

interface RemoveItemParams {
  cartId: string;
  cartVersion: number;
  lineItemId: string;
  isAuthenticated: boolean;
}

export const removeItemFromCart = async ({
  cartId,
  cartVersion,
  lineItemId,
  isAuthenticated,
}: RemoveItemParams) => {
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
        version: cartVersion,
        actions: [
          {
            action: "removeLineItem",
            lineItemId,
          },
        ],
      },
    })
    .execute();

  return response.body;
};
