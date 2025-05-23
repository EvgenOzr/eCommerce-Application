import { ctpClient } from "./BuildClient";
import {
  //TODO   ApiRoot,
  createApiBuilderFromCtpClient,
} from "@commercetools/platform-sdk";

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

export const getProject = () => {
  return apiRoot.get().execute();
};
