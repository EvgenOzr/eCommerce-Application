import { apiRoot } from "./Client";

export const getProductsByCategory = async (
  categoryId: string,
  limit: number,
  offset: number
) => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: `categories(id="${categoryId}")`,
        limit: limit,
        offset: offset,
      },
    })
    .execute();
};
