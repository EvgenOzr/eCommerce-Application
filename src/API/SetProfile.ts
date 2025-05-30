import { CustomerUpdate } from "@commercetools/platform-sdk";
import { apiRoot } from "./Client";

export const setUserProfile = async (
  customerId: string,
  body: CustomerUpdate
) => {
  return await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({ body })
    .execute();
};
