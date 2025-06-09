import "./ProductItem.scss";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../button/Button";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import { addItemToCart } from "../../API/AddItemToCart";
import { ProductItems } from "../../types/shopTypes";
import { CONVERT_CENT_USD } from "../../types/constants";

export const ProductItem = ({ product, onClick }: ProductItems) => {
  const productDescription = product.description?.["en-GB"]
    ? product.description["en-GB"].length > 30
      ? `${product.description["en-GB"].slice(0, 100)}...`
      : product.description["en-GB"]
    : "No description available";

  const productPrice =
    (product.masterVariant?.prices?.[0]?.value?.centAmount ?? 0) /
    CONVERT_CENT_USD;
  const productName = product.name["en-GB"];

  const productDiscount = product.masterVariant?.prices?.[0].discounted;

  const { cart, setCart, isLoginned } = useContext(ShopContext);

  const isInCart = cart?.lineItems.some(
    (item) => item.productId === product.id
  );

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!cart || isInCart) return;

    try {
      const updatedCart = await addItemToCart(
        cart.id,
        cart.version,
        product.id,
        product.masterVariant.id,
        isLoginned
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

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
            {formatPrice(productDiscount.value.centAmount / CONVERT_CENT_USD)} $
          </p>
        </div>
      ) : (
        <div className="product-item-container_price">
          <p className="product-item-container_price_value">
            {formatPrice(productPrice)} $
          </p>
        </div>
      )}
      <Button
        value={isInCart ? "Already in cart" : "Add to cart"}
        className={isInCart ? "disabled" : "add"}
        onClick={handleAddToCart}
        disabled={isInCart}
      />
    </div>
  );
};
