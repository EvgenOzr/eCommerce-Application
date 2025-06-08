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
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { tokenCache } from "../utils/token";

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
    tokenCache: tokenCache,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build();
};

function authRequestClient(email: string, password: string) {
  const client = authenticateUser(email, password);
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
}

export async function authRequestResponse(email: string, password: string) {
  const authLogin = authRequestClient(email, password);
  return authLogin.me().login().post({ body: { email, password } }).execute();
}
