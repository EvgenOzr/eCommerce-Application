import "./Footer.scss";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/products/category/${categorySlug}`);
  };

  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_info">
          <p className="footer_name">Modeva</p>
          <div className="footer_contact">
            <div className="footer_contact-data">
              <span>WhatsApp</span>
              <span>Email</span>
              <span>Address</span>
            </div>
            <div className="footer_contact-data">
              <a
                href="https://wa.me/628599999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>: +00 000 0000 000</span>
              </a>
              <a href="mailto:dreamstoremakers@gmail.com">
                <span>: dreamstoremakers@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/search/Lorem+ipsum+street+Block+B+Number+08,+Jakarta,+Indonesia,+12345" // Пример URL для Google Maps
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  : Lorem ipsum street Block B Number 08, Jakarta, Indonesia,
                  12345
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer_menu">
          <div>
            <p className="footer_menu-title">Menu</p>
            <div className="footer_menu-submenu">
              <span>Sale</span>
              <span
                className="footer_menu-submenu-item"
                onClick={() => handleCategoryClick("formal-man")}
              >
                Formal Men
              </span>
              <span
                className="footer_menu-submenu-item"
                onClick={() => handleCategoryClick("formal-woman")}
              >
                Formal Woman
              </span>
              <span
                className="footer_menu-submenu-item"
                onClick={() => handleCategoryClick("casual-style")}
              >
                Casual Style
              </span>
            </div>
          </div>
          <div>
            <p className="footer_menu-title">Account</p>
            <div className="footer_menu-submenu">
              <a href="/profile">
                <span>My Account</span>
              </a>
              <span>My Orders</span>
              <span>Vouchers and Discounts</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <p>All rights reserved </p>
        <p>Copyright 2025 By Dreamstoremakers</p>
      </div>
    </div>
  );
};

export default Footer;
