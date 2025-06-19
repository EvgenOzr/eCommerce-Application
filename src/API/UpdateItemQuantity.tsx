import { apiRootUser, apiRootAnonymous } from "./Client";

export const updateItemQuantity = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity: number,
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
            action: "changeLineItemQuantity",
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

  return response.body;
};
