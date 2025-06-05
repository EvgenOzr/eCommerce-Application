import { ProductSearchFilters } from "../types/shopTypes";
import { buildOrFilter } from "./buildOrFilter";
import { CONVERT_CENT_USD, PRICE_RANGE } from "../types/constants";

export const buildFilterQueries = (
  filters?: ProductSearchFilters,
  additionalFilters: string[] = []
): string[] => {
  const filterQuery: string[] = [...additionalFilters];

  if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
    const min = filters.priceMin ?? PRICE_RANGE.START;
    const max = filters.priceMax ?? PRICE_RANGE.END;
    filterQuery.push(
      `variants.price.centAmount:range(${min * CONVERT_CENT_USD} to ${max * CONVERT_CENT_USD})`
    );
  }

  if (filters?.size && filters.size.length > 0) {
    filterQuery.push(
      buildOrFilter("variants.attributes.size-enum.label", filters.size)
    );
  }

  if (filters?.color && filters.color.length > 0) {
    filterQuery.push(
      buildOrFilter("variants.attributes.color-enum.label", filters.color)
    );
  }

  if (filters?.brand && filters.brand.length > 0) {
    filterQuery.push(
      buildOrFilter("variants.attributes.brand-enum.label", filters.brand)
    );
  }

  return filterQuery;
};
