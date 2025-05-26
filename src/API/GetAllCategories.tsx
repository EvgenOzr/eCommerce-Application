import { apiRoot } from "./Client";
import { LIMIT_CATEGORIES } from "../types/constants";

export const getAllCategories = async () => {
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        limit: LIMIT_CATEGORIES,
      },
    })
    .execute();
  return response.body.results;
};
