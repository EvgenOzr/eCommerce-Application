import { apiRoot } from "./Client";

export const getProducts = (limit: number, offset: number, sort?: string) => {
  const queryArgs: { [key: string]: string | number | boolean | string[] } = {
    limit,
    offset,
  };

  if (sort) {
    queryArgs.sort = [sort];
  }

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();
};
