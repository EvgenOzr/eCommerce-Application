import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../API/GetAllCategories";
import "./Sidebar.scss";
import { CategoryWithChildren } from "../../types/shopTypes";
import { buildCategoryTree } from "../../utils/categoryUtils";

export function Sidebar() {
  const location = useLocation();
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const navigate = useNavigate();

  const categoryPath = location.pathname
    .replace("/products/category/", "")
    .replace(/\/$/, "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        const clothesCategory = data.find(
          (cat) => cat.slug?.["en-GB"] === "clothes"
        );

        if (!clothesCategory) {
          setCategories([]);
          return;
        }

        const childrenTree = buildCategoryTree(data, clothesCategory.id);
        setCategories(childrenTree);
      } catch (error) {
        setCategories([]);
        throw new Error(String(error));
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (fullPath: string) => {
    if (fullPath === categoryPath) {
      navigate(`/products/category/${fullPath}?reload=${Date.now()}`, {
        replace: true,
      });
    } else {
      navigate(`/products/category/${fullPath}`);
    }
  };

  const renderCategories = (
    categories: CategoryWithChildren[],
    level = 0,
    parentPath = ""
  ) => {
    return (
      <ul className={`category-level-${level}`}>
        {categories.map((category) => {
          const slug = category.slug?.["en-GB"];
          const currentPath = parentPath ? `${parentPath}/${slug}` : slug;
          const isActive = currentPath === categoryPath;

          return (
            <li
              key={category.id}
              onClick={(e) => {
                e.stopPropagation();
                if (currentPath) {
                  handleClick(currentPath);
                }
              }}
              className={isActive ? "active-category" : ""}
            >
              {category.name?.["en-GB"]}
              {category.children.length > 0 &&
                renderCategories(category.children, level + 1, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <h3>CATEGORIES</h3>
      {renderCategories(categories)}
    </div>
  );
}
