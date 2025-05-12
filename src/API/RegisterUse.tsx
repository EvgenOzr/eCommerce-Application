import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { RegistrationFormData } from "../types/shopTypes";
import { projectKey } from "../types/constants";
import { ctpClient } from "./BuildClient";

const projectApi = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

export const registerUser = async (registrationData: RegistrationFormData) => {
  try {
    const { firstName, lastName, email, password, adresses, date } =
      registrationData;

    const customerDraft: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      addresses?: {
        country: string;
        postalCode: string;
        city: string;
        streetName: string;
      }[];
      dateOfBirth: string;
    } = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth: date,
    };

    if (adresses) {
      customerDraft.addresses = [
        {
          country: adresses.country,
          postalCode: adresses.postalcode,
          city: adresses.city,
          streetName: adresses.street,
        },
      ];
    }

    await projectApi
      .customers()
      .post({
        body: customerDraft,
      })
      .execute();

    return {};
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) };
    }
  }
};
