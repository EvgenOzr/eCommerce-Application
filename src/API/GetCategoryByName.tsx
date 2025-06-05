import { apiRoot } from "./Client";

export const getCategoryByName = async (categorySlug: string) => {
  try {
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `slug(en-GB="${categorySlug}")`,
        },
      })
      .execute();

    return response.body.results[0];
  } catch (error) {
    throw new Error(String(error));
  }
};
