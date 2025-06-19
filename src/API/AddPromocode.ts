import { addPromoParams } from "../types/shopTypes";
import { apiRootUser, apiRootAnonymous } from "./Client";

export const addPromocode = async ({
  cartId,
  cartVersion,
  isAuthenticated,
  promocode,
}: addPromoParams) => {
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
        actions: [{ action: "addDiscountCode", code: promocode }],
      },
    })
    .execute();

  return response.body;
};
