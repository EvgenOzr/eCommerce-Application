import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from "@commercetools/platform-sdk";
import { apiRoot } from "./Client";

export const getProductsId = (): Promise<
  ClientResponse<ProductProjectionPagedSearchResponse>
> => {
  return apiRoot
    .productProjections()
    .search()
    .get({ queryArgs: { fuzzy: true } })
    .execute();
};
