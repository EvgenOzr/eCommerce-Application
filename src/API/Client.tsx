import { ctpClient, ctpAnonymousClient, ctpUserClient } from "./BuildClient";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { projectKey } from "../types/constants";

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

export const apiRootAnonymous = createApiBuilderFromCtpClient(
  ctpAnonymousClient
).withProjectKey({
  projectKey,
});

export const apiRootUser = createApiBuilderFromCtpClient(
  ctpUserClient
).withProjectKey({ projectKey });

export const getProject = () => {
  return apiRoot.get().execute();
};
