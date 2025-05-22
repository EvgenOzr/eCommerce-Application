import { apiRoot } from "./Client";

export const getProducts = (id: string) => {
  return apiRoot.productProjections().withId({ ID: id }).get().execute();
};
