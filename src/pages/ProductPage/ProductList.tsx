import { useEffect, useState } from "react";
import { getProducts } from "../../API/GetProducts";
import "./ProductList.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import { ProductItem } from "../../components/productItem/ProductItem";
import { useNavigate } from "react-router";

export function ProductList() {
  const [products, setProducts] = useState<ProductProjection[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsArray = data.body.results;
        setProducts(productsArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDetailedPageClick = (id: string) => {
    navigate(`/products/${id}`);
  };

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
            <div>Loading products...</div>
          )}
        </div>
      </div>
    </section>
  );
}
