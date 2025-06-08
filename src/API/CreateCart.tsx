import { apiRootUser, apiRootAnonymous } from "./Client";

export const createCart = async ({
  customerId,
  anonymousId,
}: {
  customerId?: string;
  anonymousId?: string;
}) => {
  const root = customerId ? apiRootUser : apiRootAnonymous;

  if (!root) {
    throw new Error("User client is not initialized or token is missing");
  }

  const cartDraft = {
    currency: "USD",
    customerId: customerId ? customerId : undefined,
    anonymousId: anonymousId ? anonymousId : undefined,
  };

  const response = await root.me().carts().post({ body: cartDraft }).execute();

  return response.body;
};
