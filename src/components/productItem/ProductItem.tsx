import { Product } from "@commercetools/platform-sdk";
import "./ProductItem.scss";

type ProductItem = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItem) => {
  return (
    <div className="product-item-container">
      <div className="product-item-container_img">
        <img
          className="product-item-container_imgage"
          src={product.masterData.current.masterVariant.images?.[0].url}
          alt=""
          sizes="500px"
        />
      </div>
      <div className="product-container_description">
        <p className="product_type">Type</p>
        <h3 className="product-title">
          {product.masterData.current.name["en-US"]}
        </h3>
      </div>
      <p className="product-price">Price</p>
    </div>
  );
};
