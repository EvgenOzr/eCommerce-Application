import "./Footer.scss";

const Footer = () => {
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
              <span>: +62 859 9999 999</span>
              <span>: dreamstoremakers@gmail.com</span>
              <span>
                : Lorem ipsum street Block B Number 08, Jakarta, Indonesia,
                12345
              </span>
            </div>
          </div>
        </div>
        <div className="footer_menu">
          <div>
            <p className="footer_menu-title">Menu</p>
            <div className="footer_menu-submenu">
              <span>Sale</span>
              <span>New Arrivals</span>
              <span>Formal Men</span>
              <span>Formal Woman</span>
              <span>Casual Men</span>
              <span>Casual Woman</span>
            </div>
          </div>
          <div>
            <p className="footer_menu-title">Get Help</p>
            <div className="footer_menu-submenu">
              <span>FAQ</span>
              <span>Customer Service</span>
              <span>Refund and Return</span>
              <span>Terms and Conditions</span>
              <span>Shipping</span>
            </div>
          </div>
          <div>
            <p className="footer_menu-title">Account</p>
            <div className="footer_menu-submenu">
              <span>My Account</span>
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
