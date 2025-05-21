import { apiRoot } from "./Client";

export const getProducts = () => {
  return apiRoot.products().get().execute();
};
