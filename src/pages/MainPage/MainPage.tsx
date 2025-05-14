import Banner from "../../components/banner/Banner";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="main-up">
        <Banner
          textMain={"Discount 20% For New Member, "}
          textAdd={"ONLY FOR TODAY!!"}
        />
        <div className="main-made">
          <div className="main-made_container">
            <div className="main-made_title">
              made in Indonesia, dedicated to Indonesia
            </div>
            <div className="main-made_subtitle">
              Discover the Art of Dressing Up
            </div>
          </div>
        </div>
        <div className="scroll_down">
          <div className="scroll_down_text">scroll down</div>
          <div className="scroll_down_arrow"></div>
        </div>
      </div>
      <div className="main-style">
        <div className="main-style_woman"></div>
        <div className="main-style_casual"></div>
        <div className="main-style_men"></div>
      </div>
      <div className="main-advantage">
        <div className="main-advantage_container main-advantage_cart__1">
          <div className="main-advantage_cart">
            <div className="main-advantage_cart__logo main-advantage_cart__logo_hund"></div>
            <div className="main-advantage_cart__description">
              <div className="main-advantage_cart__title">
                100% Satisfaction Guaranteed
              </div>
              <div className="main-advantage_cart__text">
                Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet
                scelerisque morbi vulputate. Quisque bibendum eget id diam
                elementum fringilla duis.
              </div>
            </div>
          </div>
        </div>
        <div className="main-advantage_container main-advantage_cart__2">
          <div className="main-advantage_cart main-advantage_cart__row">
            <div className="main-advantage_cart__logo main-advantage_cart__logo_phone"></div>
            <div className="main-advantage_cart__description main-advantage_cart__description_row">
              <div className="main-advantage_cart__title">
                24/7 Online Service
              </div>
              <div className="main-advantage_cart__text">
                Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet
                scelerisque morbi vulputate. Quisque bibendum eget id diam
                elementum fringilla duis.
              </div>
            </div>
          </div>
        </div>
        <div className="main-advantage_container main-advantage_cart__3">
          <div className="main-advantage_cart">
            <div className="main-advantage_cart__logo main-advantage_cart__logo_card"></div>
            <div className="main-advantage_cart__description">
              <div className="main-advantage_cart__title">
                Payment With Secure System
              </div>
              <div className="main-advantage_cart__text">
                Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet
                scelerisque morbi vulputate. Quisque bibendum eget id diam
                elementum fringilla duis.
              </div>
            </div>
          </div>
        </div>
        <div className="main-advantage_container main-advantage_cart__4">
          <div className="main-advantage_cart main-advantage_cart__row">
            <div className="main-advantage_cart__logo main-advantage_cart__logo_rocket"></div>
            <div className="main-advantage_cart__description main-advantage_cart__description_row">
              <div className="main-advantage_cart__title">Fast Delivery</div>
              <div className="main-advantage_cart__text">
                Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet
                scelerisque morbi vulputate. Quisque bibendum eget id diam
                elementum fringilla duis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
