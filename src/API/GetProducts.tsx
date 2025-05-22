import { apiRoot } from "./Client";

export const getProducts = () => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 21,
      },
    })
    .execute();
};
