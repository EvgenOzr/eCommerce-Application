import { apiRoot } from "./Client";
import { ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";
import { ProductSearchFilters } from "../types/shopTypes";
import { buildFilterQueries } from "../utils/buildFilterQueries";

export const getProductsByCategory = async (
  categoryId: string,
  limit: number,
  offset: number,
  sort?: string,
  filters?: ProductSearchFilters
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

  const categoryFilter = [`categories.id: subtree("${categoryId}")`];
  const filterQuery = buildFilterQueries(filters, categoryFilter);

  const queryArgs: {
    filter: string[];
    limit: number;
    offset: number;
    sort?: string[];
  } = {
    filter: filterQuery,
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
