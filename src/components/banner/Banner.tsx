import "./Banner.scss";
import { BannerProps } from "../../types/shopTypes";
import { useState } from "react";

const Banner = ({ textMain, textAdd }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return <div className="banner banner_hide"></div>;
  }

  return (
    <div className="banner" data-testid="banner-container">
      <div className="banner_textfield">
        <div className="banner_textMain">
          {textMain}
          <span className="banner_textAdd">{textAdd}</span>
        </div>
      </div>
      <button className="banner_closeButton" onClick={handleClose}></button>
    </div>
  );
};

export default Banner;
