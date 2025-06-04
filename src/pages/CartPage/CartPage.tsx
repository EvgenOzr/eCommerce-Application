import { useState } from "react";
import Banner from "../../components/banner/Banner";
import "./CartPage.scss";
import saleIcon from "../../assets/images/Product/sale-icon.png";

function CartPage() {
  const [count, setCount] = useState(1);

  const handleCountUp = () => {
    setCount((prev) => prev + 1);
  };

  const handleCountDown = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <section className="cart-container">
      <h2 className="cart-container_title">CART</h2>
      <div className="cart-wrapper">
        <div className="cart-wrapper_items">
          <div className="cart-wrapper_items_item">
            <div className="cart-img"></div>
            <div className="cart-wrapper_items_item-inf">
              <h4 className="cart-wrapper_items_item-inf_title">
                White casual t-shirt
              </h4>
              <p className="cart-wrapper_items_item-inf_price">
                400$ <img className="sale-icon" src={saleIcon} alt="" />
              </p>
              <p className="cart-wrapper_items_item-inf_price_discount">350$</p>
              <div className="cart-wrapper_items_item-inf_count">
                <button onClick={handleCountDown} className="count_button">
                  -
                </button>
                <p>{count}</p>
                <button onClick={handleCountUp} className="count_button">
                  +
                </button>
              </div>
            </div>
            <button className="delete_button">Delete</button>
          </div>
        </div>
        <div className="cart-wrapper_order">
          <div className="cart-wrapper_order-item">
            <h3 className="cart-wrapper_order-item_title">SHOPPING INFO</h3>
            <Banner
              textMain="Hooray! You have promo code"
              textAdd=" Use promo code"
            />
            <div className="order-item-price">
              <div className="order-item-price-subtotal">
                <p className="order-item-price-subtotal_title">Subtotal</p>
                <p className="order-item-price-subtotal_subtitle">300.00$</p>
              </div>
              <div className="order-item-price-total">
                <p className="order-item-price-total_title">Total</p>
                <p className="order-item-price-total_subtitle">250.00$</p>
              </div>
            </div>
            <button className="cart-wrapper_button">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
