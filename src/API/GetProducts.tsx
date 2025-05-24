import { apiRoot } from "./Client";

export const getProducts = (limit: number, offset: number) => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: limit,
        offset: offset,
      },
    })
    .execute();
};
