import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../API/GetAllCategories";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Category } from "@commercetools/platform-sdk";

export function BreadcrumbsNav() {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<Category[]>([]);
  const navigate = useNavigate();

  const categoryPathName = location.pathname
    .replace("/products/category/", "")
    .replace(/\/$/, "");

  useEffect(() => {
    const buildBreadcrumb = async () => {
      if (!categoryPathName) return setBreadcrumbItems([]);

      const allCategories = await getAllCategories();
      const slugs = categoryPathName.split("/");

      const pathCategories: Category[] = [];

      for (const slug of slugs) {
        const category = allCategories.find(
          (cat) => cat.slug?.["en-GB"] === slug
        );
        if (category) {
          pathCategories.push(category);
        }
      }

      setBreadcrumbItems(pathCategories);
    };

    buildBreadcrumb();
  }, [categoryPathName]);

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
        const path = breadcrumbItems
          .slice(0, index + 1)
          .map((c) => c.slug?.["en-GB"])
          .join("/");

        return (
          <Link
            key={cat.id}
            underline={isLast ? "none" : "hover"}
            color={isLast ? "text.primary" : "#8b4513"}
            onClick={() => {
              if (isLast) {
                navigate(`/products/category/${path}?reload=${Date.now()}`, {
                  replace: true,
                });
              } else {
                navigate(`/products/category/${path}`);
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
