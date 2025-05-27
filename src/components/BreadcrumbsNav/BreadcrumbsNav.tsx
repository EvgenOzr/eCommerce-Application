import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../API/GetAllCategories";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Category } from "@commercetools/platform-sdk";

export function BreadcrumbsNav() {
  const { categorySlug } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const buildBreadcrumb = async () => {
      if (!categorySlug) return setBreadcrumbItems([]);

      const allCategories = await getAllCategories();
      const currentCategory = allCategories.find(
        (cat) => cat.slug?.["en-GB"] === categorySlug
      );
      if (!currentCategory) return;

      const collectAncestors = (
        category: Category,
        path: Category[] = []
      ): Category[] => {
        if (!category.parent?.id) return path;

        const parentCategory = allCategories.find(
          (cat) => cat.id === category.parent?.id
        );
        if (!parentCategory) return path;

        path = collectAncestors(parentCategory, path);

        if (parentCategory.slug?.["en-GB"] !== "clothes") {
          path.push(parentCategory);
        }

        return path;
      };

      const path = collectAncestors(currentCategory);

      if (currentCategory.slug?.["en-GB"] !== "clothes") {
        path.push(currentCategory);
      }
      setBreadcrumbItems(path);
    };

    buildBreadcrumb();
  }, [categorySlug]);

  return (
    <Breadcrumbs sx={{ marginBottom: "16px" }}>
      <Link
        underline="hover"
        color="#8b4513"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Main
      </Link>
      <Link
        underline="hover"
        color="#8b4513"
        onClick={() => navigate("/products")}
        sx={{ cursor: "pointer" }}
      >
        Catalog
      </Link>
      {breadcrumbItems.map((cat, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <Link
            key={cat.id}
            underline={isLast ? "none" : "hover"}
            color={isLast ? "text.primary" : "inherit"}
            onClick={() => {
              if (isLast) {
                navigate(
                  `/products/category/${cat.slug?.["en-GB"]}?reload=${Date.now()}`,
                  { replace: true }
                );
              } else {
                navigate(`/products/category/${cat.slug?.["en-GB"]}`);
              }
            }}
            sx={{ cursor: "pointer" }}
          >
            {cat.name?.["en-GB"]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
