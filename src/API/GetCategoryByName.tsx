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

    console.log("Category search result:", response.body.results);
    return response.body.results[0];
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
