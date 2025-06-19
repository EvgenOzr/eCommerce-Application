import fetch from "cross-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type ExistingTokenMiddlewareOptions,
} from "@commercetools/ts-client";
import {
  authUrl,
  apiUrl,
  clientId,
  clientSecret,
  projectKey,
} from "../types/constants";
import { tokenCache } from "../utils/token";

const scopes = import.meta.env.VITE_CTP_SCOPES
  ? import.meta.env.VITE_CTP_SCOPES.split(",")
  : [];

const savedToken = tokenCache.get();

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

const anonymousAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes,
  httpClient: fetch,
};

const existingTokenOptions: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const ctpAnonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpUserClient = new ClientBuilder()
  .withExistingTokenFlow(`Bearer ${savedToken.token}`, existingTokenOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
