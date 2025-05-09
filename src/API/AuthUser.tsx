import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder } from "@commercetools/ts-client";
import { PasswordAuthMiddlewareOptions } from "@commercetools/ts-client";

const authUrl = import.meta.env.VITE_CTP_AUTH_URL;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

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
    scopes: import.meta.env.VITE_CTP_SCOPES.split(","),
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
