import { useEffect, useState } from "react";
import { getProducts } from "../../API/GetProducts";
import "./ProductList.scss";
import { ProductProjection, Category } from "@commercetools/platform-sdk";
import { ProductItem } from "../../components/productItem/ProductItem";
import { useNavigate, useSearchParams, useLocation } from "react-router";
import { ClockLoader } from "react-spinners";
import Pagination from "@mui/material/Pagination";
import { LIMIT_ITEMS_PER_PAGE } from "../../types/constants";
import { getProductsByCategory } from "../../API/GetProductsByCategory";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { BreadcrumbsNav } from "../../components/BreadcrumbsNav/BreadcrumbsNav";
import { FIRST_PAGE } from "../../types/constants";
import { getAllCategories } from "../../API/GetAllCategories";
import { CategoryWithChildren } from "../../types/shopTypes";
import {
  buildCategoryTree,
  findCategoryInTreeByPath,
} from "../../utils/categoryUtils";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SORT_OPTIONS } from "../../types/constants";
import Search from "../../components/search/Search";
import { searchProducts } from "../../API/SearchProduct";

export function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || FIRST_PAGE
  );
  const navigate = useNavigate();

  const [allAvailableCategories, setAllAvailableCategories] = useState<
    Category[]
  >([]);

  const [sortOption, setSortOption] = useState<string>(() => {
    return searchParams.get("sort") || "";
  });

  const categoryPathName = location.pathname
    .replace("/products/category/", "")
    .replace(/\/$/, "");

  const lastPathPart = (() => {
    if (!categoryPathName) return "";
    const parts = categoryPathName.split("/");
    return parts.length ? parts[parts.length - 1].replace(/-/g, " ") : "";
  })();

  const handleSearch = async (text: string) => {
    const response = await searchProducts(text);
    console.log(response);
  };

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
      try {
        const data = await getAllCategories();
        setAllAvailableCategories(data);
      } catch (error) {
        console.error("Error getting all categories:", error);
      }
    };
    fetchAllCategoriesData();
  }, []);

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || FIRST_PAGE;
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams, page]);

  useEffect(() => {
    const fetchProductsData = async () => {
      setProducts(undefined);
      const offset = (page - FIRST_PAGE) * LIMIT_ITEMS_PER_PAGE;
      let productsData: ProductProjection[] = [];
      let totalProductsCount = 0;
      const apiSortParam = sortOption === "" ? undefined : sortOption;
      try {
        const isAllProductsPage =
          location.pathname === "/products" || location.pathname === "/";

        if (isAllProductsPage) {
          const data = await getProducts(
            LIMIT_ITEMS_PER_PAGE,
            offset,
            apiSortParam
          );
          productsData = data.body.results;
          totalProductsCount = data.body.total != null ? data.body.total : 0;
        } else if (categoryPathName && allAvailableCategories.length > 0) {
          const pathParts = categoryPathName.split("/");

          const clothesCategory = allAvailableCategories.find(
            (cat) => cat.slug?.["en-GB"] === "clothes"
          );

          let fullCategoryTree: CategoryWithChildren[] = [];
          if (clothesCategory) {
            fullCategoryTree = buildCategoryTree(
              allAvailableCategories,
              clothesCategory.id
            );
          }

          const targetCategoryInTree = findCategoryInTreeByPath(
            fullCategoryTree,
            pathParts
          );

          let categoryIdForSubtreeFilter: string | undefined;
          if (targetCategoryInTree) {
            categoryIdForSubtreeFilter = targetCategoryInTree.id;
          }

          if (categoryIdForSubtreeFilter) {
            const data = await getProductsByCategory(
              categoryIdForSubtreeFilter,
              LIMIT_ITEMS_PER_PAGE,
              offset,
              apiSortParam
            );
            productsData = data.body.results;
            totalProductsCount = data.body.total != null ? data.body.total : 0;
          }
        }

        setProducts(productsData);
        setTotalProducts(totalProductsCount);
      } catch (error) {
        setProducts([]);
        setTotalProducts(0);
        throw new Error(String(error));
      }
    };

    fetchProductsData();
  }, [
    location.pathname,
    page,
    allAvailableCategories,
    categoryPathName,
    sortOption,
  ]);

  const handleDetailedPageClick = (id: string) => {
    navigate(`/products/${id}`, {
      state: {
        categoryPath: categoryPathName,
      },
    });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", value.toString());
      return params;
    });
  };

  const totalPages = Math.ceil(totalProducts / LIMIT_ITEMS_PER_PAGE);

  return (
    <section className="product-container">
      <BreadcrumbsNav />
      <h2 className="product-container_title">
        {lastPathPart ? lastPathPart.toUpperCase() : "ALL PRODUCTS"}
      </h2>
      <div className="product-actions-container">
        <div className="product-search">
          <Search onSearch={handleSearch} />
        </div>
        <div className="product-sort">
          <FormControl sx={{ m: 2, minWidth: 150 }} size="small">
            <InputLabel
              id="sort-label"
              sx={{
                color: "#a0522d",
                "&.Mui-focused": {
                  color: "#a0522d",
                },
              }}
            >
              Sort By
            </InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              label="Sort By"
              onChange={(e) => {
                const value = e.target.value;
                setSortOption(value);
                setPage(FIRST_PAGE);
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  if (value) {
                    params.set("sort", value);
                  } else {
                    params.delete("sort");
                  }
                  params.set("page", FIRST_PAGE.toString());
                  return params;
                });
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0522d",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0522d",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0522d",
                  boxShadow: "0 0 5px 2px rgba(160, 82, 45, 0.5)",
                },
              }}
            >
              <MenuItem
                value=""
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#8b4513",
                    },
                  },
                }}
              >
                Default
              </MenuItem>
              <MenuItem
                value={SORT_OPTIONS.PRICE_ASC}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#8b4513",
                    },
                  },
                }}
              >
                Price: Low to High
              </MenuItem>
              <MenuItem
                value={SORT_OPTIONS.PRICE_DESC}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#8b4513",
                    },
                  },
                }}
              >
                Price: High to Low
              </MenuItem>
              <MenuItem
                value={SORT_OPTIONS.NAME_ASC}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#8b4513",
                    },
                  },
                }}
              >
                Name: A-Z
              </MenuItem>
              <MenuItem
                value={SORT_OPTIONS.NAME_DESC}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#8b4513",
                    },
                  },
                }}
              >
                Name: Z-A
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="product-wrapper">
        <aside className="product-wrapper_category">
          <Sidebar />
        </aside>
        <div className="product-wrapper_list">
          {products ? (
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onClick={() => handleDetailedPageClick(product.id)}
              />
            ))
          ) : (
            <div className="item-container_loader">
              <ClockLoader size={150} color="#8b4513" />
            </div>
          )}
          {products && products.length === 0 && (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
      <div>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#a0522d",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#8b4513",
                },
              },
            }}
          />
        )}
      </div>
    </section>
  );
}
