import { apiRoot } from "./Client";

export const getProducts = () => {
  return apiRoot.productProjections().get().execute();
};
