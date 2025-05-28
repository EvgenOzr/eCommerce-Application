import { CustomerChangePassword } from "@commercetools/platform-sdk";
import { apiRoot } from "./Client";

export const changeUserPassword = async (body: CustomerChangePassword) => {
  // return await apiRoot.me().password().post({body}).execute()
  return await apiRoot.customers().password().post({ body }).execute();
};
