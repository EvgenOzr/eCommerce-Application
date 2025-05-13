import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder } from "@commercetools/ts-client";
import { PasswordAuthMiddlewareOptions } from "@commercetools/ts-client";
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from "../types/constants";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<{
  accessToken?: string;
  refreshToken?: string;
  error?: unknown;
}> => {
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

  const client = new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptions)
    .build();

  const projectApi = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });

  try {
    await projectApi.me().get().execute();
    return {};
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) };
    }
  }
};
