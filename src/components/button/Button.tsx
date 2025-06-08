import { ButtonProps } from "../../types/shopTypes";
import "./Button.scss";

function Button({ className, value, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={`cart-button button-${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Button;
