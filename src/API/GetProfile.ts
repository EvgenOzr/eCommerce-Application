import { apiRoot } from "./Client";

export const getProfile = async (customerId: string) => {
  return await apiRoot.customers().withId({ ID: customerId }).get().execute();
};
