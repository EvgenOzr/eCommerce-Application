import { ProductProjection } from "@commercetools/platform-sdk";
import "./ProductItem.scss";

type ProductItem = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItem) => {
  const productDescription = product.description?.["en-GB"]
    ? product.description["en-GB"].length > 30
      ? `${product.description["en-GB"].slice(0, 100)}...`
      : product.description["en-GB"]
    : "No description available";

  return (
    <div className="product-item-container">
      <div className="product-item-container_img">
        <img
          className="product-item-container_imgage"
          src={product.masterVariant.images?.[0]?.url}
          alt=""
          sizes="500px"
        />
      </div>
      <div className="product-container_description">
        <h3 className="product-title">{product.name["en-GB"]}</h3>
        <p className="product_inf">{productDescription}</p>
      </div>
      <p className="product-price">Price</p>
    </div>
  );
};
