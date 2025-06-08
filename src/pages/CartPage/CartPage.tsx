import { useEffect, useContext } from "react";
import Banner from "../../components/banner/Banner";
import "./CartPage.scss";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import { ShopContext } from "../../context/shopContext";
import { getActiveCart } from "../../API/GetActiveCart";
import { updateItemQuantity } from "../../API/UpdateItemQuantity";
import { removeItemFromCart } from "../../API/RemoveItemFromCart";
import { CONVERT_CENT_USD } from "../../types/constants";

function CartPage() {
  const { cart, setCart, customerId, anonymousId, isLoginned } =
    useContext(ShopContext);

  useEffect(() => {
    const fetchCart = async () => {
      const activeCart = await getActiveCart({
        customerId: isLoginned ? customerId : undefined,
        anonymousId: !isLoginned ? anonymousId : undefined,
      });
      if (activeCart) {
        setCart(activeCart);
      }
    };

    if (!cart) {
      fetchCart();
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

  return (
    <section className="cart-container">
      <h2 className="cart-container_title">CART</h2>
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
                <p className="order-item-price-total_subtitle">
                  {cart?.totalPrice
                    ? `${(cart.totalPrice.centAmount / CONVERT_CENT_USD).toFixed(2)} ${cart.totalPrice.currencyCode}`
                    : "0.00 $"}
                </p>
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
