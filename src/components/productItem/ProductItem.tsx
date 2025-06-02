import { ProductProjection } from "@commercetools/platform-sdk";
import "./ProductItem.scss";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import { formatPrice } from "../../utils/formatPrice";

type ProductItem = {
  product: ProductProjection;
  onClick: (productId: string) => void;
};

export const ProductItem = ({ product, onClick }: ProductItem) => {
  const productDescription = product.description?.["en-GB"]
    ? product.description["en-GB"].length > 30
      ? `${product.description["en-GB"].slice(0, 100)}...`
      : product.description["en-GB"]
    : "No description available";

  const productPrice =
    (product.masterVariant?.prices?.[0]?.value?.centAmount ?? 0) / 100;
  const productName = product.name["en-GB"];

  const productDiscount = product.masterVariant?.prices?.[0].discounted;

  return (
    <div className="product-item-container" onClick={() => onClick(product.id)}>
      <div className="product-item-container_img">
        <img
          className="product-item-container_image"
          src={product.masterVariant.images?.[0]?.url}
          alt=""
          sizes="500px"
        />
      </div>
      <div className="product-item-container_description">
        <h3 className="product-item-container_description_title">
          {productName}
        </h3>
        <p className="product-item-container_description_inf">
          {productDescription}
        </p>
      </div>
      {productDiscount ? (
        <div className="product-item-container_price">
          <p className="product-item-container_price_value discounted">
            {formatPrice(productPrice)} $
          </p>
          <img
            src={saleIcon}
            alt="sale-icon"
            className="product-item-container_price_icon"
          />
          <p className="product-item-container_price_discount">
            {formatPrice(productDiscount.value.centAmount / 100)} $
          </p>
        </div>
      ) : (
        <div className="product-item-container_price">
          <p className="product-item-container_price_value">
            {formatPrice(productPrice)} $
          </p>
        </div>
      )}
    </div>
  );
};
