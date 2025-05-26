import { useEffect, useState } from "react";
import { getProducts } from "../../API/GetProducts";
import "./ProductList.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import { ProductItem } from "../../components/productItem/ProductItem";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ClockLoader } from "react-spinners";
import Pagination from "@mui/material/Pagination";
import { LIMIT_ITEMS_PER_PAGE } from "../../types/constants";
import { getProductsByCategory } from "../../API/GetProductsByCategory";
import { getCategoryByName } from "../../API/GetCategoryByName";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { BreadcrumbsNav } from "../../components/BreadcrumbsNav/BreadcrumbsNav";
import { FIRST_PAGE } from "../../types/constants";

export function ProductList() {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalProducts, setTotalProducts] = useState(0);
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || FIRST_PAGE
  );
  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || FIRST_PAGE;
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams, page]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const offset = (page - FIRST_PAGE) * LIMIT_ITEMS_PER_PAGE;
        let data;
        if (categorySlug) {
          const category = await getCategoryByName(categorySlug);
          if (category && category.id) {
            data = await getProductsByCategory(
              category.id,
              LIMIT_ITEMS_PER_PAGE,
              offset
            );
          } else {
            setProducts([]);
            setTotalProducts(0);
            return;
          }
        } else {
          data = await getProducts(LIMIT_ITEMS_PER_PAGE, offset);
        }

        setProducts(data.body.results);
        setTotalProducts(data.body.total !== undefined ? data.body.total : 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page, categorySlug]);

  const handleDetailedPageClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString() });
  };

  const totalPages = Math.ceil(totalProducts / LIMIT_ITEMS_PER_PAGE);

  return (
    <section className="product-container">
      <BreadcrumbsNav />
      <h2 className="product-container_title">
        {categorySlug ? categorySlug.replace("-", " ") : "ALL PRODUCTS"}
      </h2>
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
