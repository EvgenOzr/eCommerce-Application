import { useEffect, useState } from "react";
import { getProducts } from "../../API/GetProducts";
import "./ProductList.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import { ProductItem } from "../../components/productItem/ProductItem";
import { useNavigate } from "react-router";
import { ClockLoader } from "react-spinners";
import Pagination from "@mui/material/Pagination";
import { LIMIT_ITEMS_PER_PAGE } from "../../types/constants";

export function ProductList() {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const offset = (page - 1) * LIMIT_ITEMS_PER_PAGE;
        const data = await getProducts(LIMIT_ITEMS_PER_PAGE, offset);
        setProducts(data.body.results);
        setTotalProducts(data.body.total !== undefined ? data.body.total : 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page]);

  const handleDetailedPageClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages = Math.ceil(totalProducts / LIMIT_ITEMS_PER_PAGE);

  return (
    <section className="product-container">
      <h2 className="product-container_title">ALL PRODUCTS</h2>
      <div className="product-wrapper">
        <aside className="product-wrapper_category">Aside Panel</aside>
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
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
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
      </div>
    </section>
  );
}
