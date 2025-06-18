import { useEffect, useContext, useState, ChangeEvent } from "react";
import Banner from "../../components/banner/Banner";
import "./CartPage.scss";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import { ShopContext } from "../../context/shopContext";
import { getActiveCart } from "../../API/GetActiveCart";
import { updateItemQuantity } from "../../API/UpdateItemQuantity";
import { removeItemFromCart } from "../../API/RemoveItemFromCart";
import { CONVERT_CENT_USD } from "../../types/constants";
import { Link } from "react-router";
import Button from "../../components/button/Button";
import { clearCart } from "../../API/ClearCart";
import { ClockLoader } from "react-spinners";
import { addPromocode } from "../../API/AddPromocode";

function CartPage() {
  const { cart, setCart, customerId, anonymousId, isLoginned } =
    useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [promocode, setPromocode] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const activeCart = await getActiveCart({
          customerId: isLoginned ? customerId : undefined,
          anonymousId: !isLoginned ? anonymousId : undefined,
        });
        if (activeCart) {
          setCart(activeCart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!cart) {
      fetchCart();
    } else {
      setIsLoading(false);
    }
  }, [cart, customerId, anonymousId, setCart, isLoginned]);

  const handleQuantityChange = async (lineItemId: string, quantity: number) => {
    if (cart) {
      const updatedCart = await updateItemQuantity(
        cart.id,
        cart.version,
        lineItemId,
        quantity,
        isLoginned
      );
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    if (!cart) return;
    const updatedCart = await removeItemFromCart({
      cartId: cart.id,
      cartVersion: cart.version,
      lineItemId,
      isAuthenticated: isLoginned,
    });
    setCart(updatedCart);
  };

  const handleClearCart = async () => {
    if (!cart) return;

    try {
      const updatedCart = await clearCart({
        cartId: cart.id,
        cartVersion: cart.version,
        isAuthenticated: isLoginned,
      });
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const handlePromoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  const handleActivatePromocode = async () => {
    if (!cart) return;

    try {
      const addPromo = await addPromocode({
        cartId: cart.id,
        cartVersion: cart.version,
        isAuthenticated: isLoginned,
        promocode: promocode,
      });
      setCart(addPromo);
    } catch (error) {
      console.error("Failed to add promo cart:", error);
    } finally {
      setPromocode("");
    }
  };

  if (isLoading) {
    return (
      <section className="cart-container">
        <div className="item-container_loader">
          <ClockLoader size={150} color="#8b4513" />
        </div>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h2 className="cart-container_title">CART</h2>

      {cart?.lineItems.length === 0 ? (
        <div className="empty-cart-message">
          <h3 className="empty-cart-title">Your cart is empty</h3>
          <Link to={"/products"} className="empty-cart-button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-wrapper">
          <div className="cart-wrapper_items">
            {cart?.lineItems.map((item) => (
              <div className="cart-wrapper_items_item" key={item.id}>
                <div className="cart-wrapper_items_item-wrapper">
                  <div className="cart-img">
                    {item.variant.images?.[0]?.url && (
                      <img
                        src={item.variant.images[0].url}
                        alt={item.name["en-GB"]}
                      />
                    )}
                  </div>
                  <div className="cart-wrapper_items_item-inf">
                    <h4 className="cart-wrapper_items_item-inf_title">
                      {item.name["en-GB"]}
                    </h4>
                    <p className="cart-wrapper_items_item-inf_price">
                      {(item.price.value.centAmount / CONVERT_CENT_USD).toFixed(
                        2
                      )}
                      {item.price.discounted && (
                        <img className="sale-icon" src={saleIcon} alt="sale" />
                      )}
                    </p>
                    {item.price.discounted && (
                      <p className="cart-wrapper_items_item-inf_price_discount">
                        {(
                          item.price.discounted.value.centAmount /
                          CONVERT_CENT_USD
                        ).toFixed(2)}
                      </p>
                    )}
                    <div className="cart-wrapper_items_item-inf_count">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="count_button"
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="count_button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="delete_button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <Button
              value="Delete all cart"
              className="cart-delete"
              onClick={handleClearCart}
            />
          </div>
          <div className="cart-wrapper_order">
            <div className="cart-wrapper_order-item">
              <h3 className="cart-wrapper_order-item_title">SHOPPING INFO</h3>
              <Banner
                textMain="Hooray! You have promo code - "
                textAdd="SUMMER10"
              />
              <input
                type="text"
                className="cart-promocode"
                placeholder="Use promo here"
                onChange={handlePromoChange}
                value={promocode}
              />
              <button
                className="cart-wrapper_button"
                onClick={handleActivatePromocode}
              >
                Activate promocode
              </button>
              <div className="order-item-price">
                {/* <div className="order-item-price-subtotal">
                  <p className="order-item-price-subtotal_title">Subtotal</p>
                  <p className="order-item-price-subtotal_subtitle">300.00$</p>
                </div> */}
                <div className="order-item-price-total">
                  <p className="order-item-price-total_title">Total</p>
                  <p className="order-item-price-total_subtitle_promo">
                    {cart?.discountOnTotalPrice
                      ? `${(cart.discountOnTotalPrice?.discountedAmount.centAmount / CONVERT_CENT_USD + cart.totalPrice.centAmount / CONVERT_CENT_USD).toFixed(2)} ${cart.totalPrice.currencyCode}`
                      : ""}
                  </p>
                  <p className="order-item-price-total_subtitle">
                    {cart?.totalPrice
                      ? `${(cart.totalPrice.centAmount / CONVERT_CENT_USD).toFixed(2)} ${cart.totalPrice.currencyCode}`
                      : "0.00 $"}
                  </p>
                </div>
              </div>
              <button className="cart-wrapper_button">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
