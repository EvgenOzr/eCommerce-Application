import { apiRoot } from "./Client";

export const getProducts = (productId: string) => {
  return apiRoot.productProjections().withId({ ID: productId }).get().execute();
};
