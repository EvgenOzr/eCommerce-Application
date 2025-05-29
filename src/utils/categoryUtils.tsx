import { Category } from "@commercetools/platform-sdk";
import { CategoryWithChildren } from "../types/shopTypes";

export const buildCategoryTree = (
  allCategories: Category[],
  parentId: string | null = null
): CategoryWithChildren[] => {
  return allCategories
    .filter((cat) => (parentId ? cat.parent?.id === parentId : !cat.parent))
    .map((cat) => ({
      ...cat,
      children: buildCategoryTree(allCategories, cat.id),
    }));
};

export const findCategoryInTreeByPath = (
  tree: CategoryWithChildren[],
  pathParts: string[]
): CategoryWithChildren | undefined => {
  if (pathParts.length === 0) return undefined;

  const [currentSlug, ...rest] = pathParts;

  const category = tree.find((cat) => cat.slug?.["en-GB"] === currentSlug);

  if (!category) return undefined;

  if (rest.length === 0) return category;

  return findCategoryInTreeByPath(category.children, rest);
};

export const getAllDescendantCategoryIds = (
  category: CategoryWithChildren
): string[] => {
  let ids: string[] = [category.id];
  category.children.forEach((child) => {
    ids = ids.concat(getAllDescendantCategoryIds(child));
  });
  return ids;
};
