import { Client, ClientBuilder } from "@commercetools/ts-client";
import { PasswordAuthMiddlewareOptions } from "@commercetools/ts-client";
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from "../types/constants";
import { httpMiddlewareOptions } from "./BuildClient";

export const authenticateUser = (email: string, password: string): Client => {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: email,
        password: password,
      },
    },
    scopes: scopes.split(","),
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build();
};
