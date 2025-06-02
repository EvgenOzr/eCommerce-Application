import { apiRoot } from "./Client";
import { ProductSearchFilters } from "../types/shopTypes";
import { buildFilterQueries } from "../utils/buildFilterQueries";

export const getProducts = (
  limit: number,
  offset: number,
  sort?: string,
  filters?: ProductSearchFilters
) => {
  const filterQuery = buildFilterQueries(filters);

  const queryArgs: { [key: string]: string | number | boolean | string[] } = {
    limit,
    offset,
  };

  if (sort) {
    queryArgs.sort = [sort];
  }

  if (filterQuery.length > 0) {
    queryArgs.filter = filterQuery;
  }

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();
};
