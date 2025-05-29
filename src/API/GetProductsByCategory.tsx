import { apiRoot } from "./Client";
import { ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";

export const getProductsByCategory = async (
  categoryId: string,
  limit: number,
  offset: number
): Promise<{ body: ProductProjectionPagedSearchResponse }> => {
  if (!categoryId) {
    return {
      body: {
        results: [],
        total: 0,
        offset: offset,
        count: 0,
        limit: limit,
      },
    };
  }

  const filterString = `categories.id:subtree("${categoryId}")`;

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterString,
        limit: limit,
        offset: offset,
      },
    })
    .execute();
};
