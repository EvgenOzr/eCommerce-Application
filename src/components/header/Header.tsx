import { Link } from "react-router";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";

const Header = () => {
  const [userStyle, setUserStyle] = useState("");
  const [exitStyle, setExitStyle] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { isLoginned, setLogin, setIsLoginned, cart } = useContext(ShopContext);

  const handleLogOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("customerId");
    setLogin("");
    setIsLoginned(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isLoginned) {
      setUserStyle("header_active__user_logined");
      setExitStyle("header_active__exit_logined");
    } else {
      setUserStyle("");
      setExitStyle("");
    }
  }, [isLoginned]);

  useEffect(() => {
    if (cart?.lineItems) {
      const count = cart.lineItems.length;
      setCartItemsCount(count);
    } else {
      setCartItemsCount(0);
    }
  }, [cart]);

  return (
    <header className="header">
      <div className="header_title">modeva</div>
      <div
        className={`header_burger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        data-testid="burger-button"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={`header_menu ${isMenuOpen ? "active" : ""}`}
        data-testid="menu"
      >
        <Link to="/" className="header_menu_item">
          Main page
        </Link>
        <Link className="header_menu_item" to={"/products"}>
          Catalog
        </Link>
        <Link className="header_menu_item" to={"/about"}>
          About us
        </Link>
      </div>
      <div className="header_active">
        <Link
          to={!isLoginned ? "/login" : "/profile"}
          className={`header_active__user ${userStyle}`}
          aria-label={isLoginned ? "User profile" : "Login"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 6C15.75 8.07107 14.0711 9.75 12 9.75C9.92896 9.75 8.25002 8.07107 8.25002 6C8.25002 3.92893 9.92896 2.25 12 2.25C14.0711 2.25 15.75 3.92893 15.75 6Z"
              stroke="#8b4513"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.50116 20.1182C4.57146 16.0369 7.9019 12.75 12 12.75C16.0983 12.75 19.4287 16.0371 19.4989 20.1185C17.2161 21.166 14.6764 21.75 12.0003 21.75C9.32402 21.75 6.78412 21.1659 4.50116 20.1182Z"
              stroke="#8b4513"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link to={"/registration"} className="header_active__reg"></Link>
        <Link to={"/cart"} className="header_active__cart">
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </Link>
        <a
          href="#"
          className={`header_active__exit ${exitStyle}`}
          onClick={handleLogOut}
          aria-label="Logout"
        ></a>
      </div>
    </header>
  );
};

export default Header;
