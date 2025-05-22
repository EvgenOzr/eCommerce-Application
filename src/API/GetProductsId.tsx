import { ClientResponse, ProductProjection } from "@commercetools/platform-sdk";
import { apiRoot } from "./Client";

export const getProductsId = (
  id: string
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot.productProjections().withId({ ID: id }).get().execute();
};
