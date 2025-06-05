import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from "@commercetools/platform-sdk";
import { apiRoot } from "./Client";

export const searchProducts = (
  text: string,
  limit: number,
  offset: number
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({ queryArgs: { "text.en-GB": text, fuzzy: true, limit, offset } })
    .execute();
};
