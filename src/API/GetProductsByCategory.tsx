import { apiRoot } from "./Client";

export const getProductsByCategory = async (
  categoryId: string,
  limit: number,
  offset: number
) => {
  console.log(`categories(id="${categoryId}")`);
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
