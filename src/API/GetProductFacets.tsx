import { apiRoot } from "./Client";
import { FacetResults } from "@commercetools/platform-sdk";
import { buildFilterQueries } from "../utils/buildFilterQueries";
import type { ProductSearchFilters } from "../types/shopTypes";

export const getProductFacets = async (
  filters?: ProductSearchFilters
): Promise<FacetResults | undefined> => {
  try {
    const filterQuery = buildFilterQueries(filters);

    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: [
            "variants.price.centAmount:range(0 to 100000)",
            "variants.attributes.brand-enum.key",
            "variants.attributes.brand-enum.label",
            "variants.attributes.color-enum.key",
            "variants.attributes.color-enum.label",
            "variants.attributes.size-enum.key",
            "variants.attributes.size-enum.label",
          ],
          filter: filterQuery,
          limit: 0,
        },
      })
      .execute();

    return response.body.facets;
  } catch (error) {
    console.error("Error retrieving product facets:", error);
    return;
  }
};
