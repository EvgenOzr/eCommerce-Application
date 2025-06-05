import { ButtonProps } from "../../types/shopTypes";
import "./Button.scss";

function Button({ className, value }: ButtonProps) {
  return <button className={`cart-button button-${className}`}>{value}</button>;
}

export default Button;
