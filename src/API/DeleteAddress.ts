import { apiRoot } from "./Client";

export const deleteCustomerAddress = async (
  customerId: string,
  version: number,
  addressId: string
) => {
  return await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: "removeAddress",
            addressId: addressId,
          },
        ],
      },
    })
    .execute();
};
