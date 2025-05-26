import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../API/GetAllCategories";
import { Category } from "@commercetools/platform-sdk";
import "./Sidebar.scss";

export function Sidebar() {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      const clothesCategory = data.find(
        (cat) => cat.slug?.["en-GB"] === "clothes"
      );
      if (!clothesCategory) {
        setCategories([]);
        return;
      }

      const childCategories = data.filter(
        (cat) => cat.parent?.id === clothesCategory.id
      );

      setCategories(childCategories);
    };
    fetchCategories();
  }, []);

  const handleClick = (slug: string) => {
    navigate(`/products/category/${slug}`);
  };

  return (
    <div>
      <h3>CATEGORIES</h3>
      <ul>
        {categories.map((category) => {
          const slug = category.slug?.["en-GB"];
          const isActive = slug === categorySlug;

          return (
            <li
              key={category.id}
              onClick={() => handleClick(slug)}
              className={isActive ? "active-category" : ""}
            >
              {category.name?.["en-GB"]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
