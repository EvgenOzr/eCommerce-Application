import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header_title">modeva</div>
      <div className="header_menu">
        <a className="header_menu_item" href="#">
          Catalog<div className="header_menu_catalog"></div>
        </a>
        <a className="header_menu_item" href="#">
          Sale
        </a>
        <a className="header_menu_item" href="#">
          New Arrival
        </a>
        <a className="header_menu_item" href="#">
          About
        </a>
      </div>
      <div className="header_active">
        <div className="header_active-search">
          <div className="header_active-search__glass"></div>
          <input
            type="text"
            className="header_active-search__text"
            placeholder="Search"
          />
        </div>
        <a href="#" className="header_active__user"></a>
        <a href="#" className="header_active__cart"></a>
      </div>
    </header>
  );
};

export default Header;
