import { apiRoot } from "./Client";
import { ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";

export const getProductsByCategory = async (
  categoryId: string,
  limit: number,
  offset: number,
  sort?: string
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

  const queryArgs: {
    filter: string;
    limit: number;
    offset: number;
    sort?: string[];
  } = {
    filter: filterString,
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
