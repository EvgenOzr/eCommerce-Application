import fetch from "cross-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/ts-client";
import {
  authUrl,
  apiUrl,
  clientId,
  clientSecret,
  projectKey,
} from "../types/constants";

const scopes = import.meta.env.VITE_CTP_SCOPES
  ? import.meta.env.VITE_CTP_SCOPES.split(",")
  : [];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes,
  httpClient: fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
