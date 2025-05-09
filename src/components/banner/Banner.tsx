import "./Banner.scss";
import { BannerProps } from "../../types/shopTypes";

const Banner = ({ textMain, textAdd }: BannerProps) => {
  return (
    <div className="banner">
      <div className="banner_textfield">
        <div className="banner_textMain">
          {textMain}
          <span className="banner_textAdd">{textAdd}</span>
        </div>
      </div>
      <button className="banner_closeButton"></button>
    </div>
  );
};

export default Banner;
