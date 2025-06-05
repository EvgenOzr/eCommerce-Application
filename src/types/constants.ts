export const authUrl = import.meta.env.VITE_CTP_AUTH_URL;
export const apiUrl = import.meta.env.VITE_CTP_API_URL;
export const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
export const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
export const scopes = import.meta.env.VITE_CTP_SCOPES;

export const LIMIT_ITEMS_PER_PAGE = 9;
export const FIRST_PAGE = 1;
export const LIMIT_CATEGORIES = 100;

export const SORT_OPTIONS = {
  PRICE_ASC: "price asc",
  PRICE_DESC: "price desc",
  NAME_ASC: "name.en-GB asc",
  NAME_DESC: "name.en-GB desc",
};

export enum DEFAULT_RANGE {
  MIN = 0,
  MAX = 500,
}

export enum PRICE_RANGE {
  START = 0,
  END = 100000,
}

export const CONVERT_CENT_USD = 100;
