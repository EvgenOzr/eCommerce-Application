import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from "../types/constants";
import { httpMiddlewareOptions } from "./BuildClient";
import { AuthMiddlewareOptions, ClientBuilder } from "@commercetools/ts-client";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { RegistrationFormData } from "../types/shopTypes";

const registerUser = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    scopes: scopes.split(","),
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();
};

function registrationRequestClient() {
  const client = registerUser();
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
}

export async function authRequestResponse(data: RegistrationFormData) {
  const authLogin = registrationRequestClient();
  return authLogin
    .me()
    .signup()
    .post({
      body: {
        firstName: data.firstName,
        lastName: data.lastName,
        addresses: [
          {
            country: data.shippingAdresses.country,
            city: data.shippingAdresses.city,
            streetName: data.shippingAdresses.street,
            postalCode: data.shippingAdresses.postalcode,
          },
          {
            country: data.billingAdresses.country,
            city: data.billingAdresses.city,
            streetName: data.billingAdresses?.street,
            postalCode: data.billingAdresses.postalcode,
          },
        ],
        dateOfBirth: data.date,
        email: data.email,
        password: data.password,
      },
    })
    .execute();
}
