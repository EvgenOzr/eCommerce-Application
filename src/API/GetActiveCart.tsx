import { apiRootUser, apiRootAnonymous } from "./Client";
import { createCart } from "./CreateCart";

export const getActiveCart = async ({
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

  const whereQuery = customerId
    ? `customerId="${customerId}" and cartState="Active"`
    : `anonymousId="${anonymousId}" and cartState="Active"`;

  try {
    const response = await root
      .me()
      .carts()
      .get({
        queryArgs: {
          where: whereQuery,
        },
      })
      .execute();

    if (response.body.count > 0) {
      return response.body.results[0];
    }
  } catch (error) {
    throw new Error(String(error));
  }

  return createCart({ customerId, anonymousId });
};
