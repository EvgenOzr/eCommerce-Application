import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ChangePasswordType } from "../../types/shopTypes";
import { changeUserPassword } from "../../API/ChangeUserPassword";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { Tooltip } from "react-tooltip";
import { CustomerChangePassword } from "@commercetools/platform-sdk";
import "./ChangePassword.scss";

interface ChangePasswordProps {
  version: number;
  onClose: () => void;
}

const ChangePassword = ({ version, onClose }: ChangePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageColor, setPasswordMessageColor] = useState("");
  const { customerId } = useContext(ShopContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({ mode: "all" });

  const changePasswordHandler: SubmitHandler<ChangePasswordType> = ({
    oldPassword,
    password,
  }) => {
    const passwordData: CustomerChangePassword = {
      id: customerId,
      version: version,
      currentPassword: oldPassword,
      newPassword: password,
    };
    changeUserPassword(passwordData)
      .then((updatePassword) => {
        console.log(updatePassword);
        if (updatePassword.statusCode === 200) {
          setPasswordMessage("Password changed");
          setPasswordMessageColor("");
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      })
      .catch((updatePasswordError) => {
        console.log(updatePasswordError);
        setPasswordMessage(updatePasswordError);
        setPasswordMessageColor("change-password-message_error");
      });
  };

  return (
    <form
      className="register-form-submit change-form-submit"
      action="submit"
      onSubmit={handleSubmit(changePasswordHandler)}
    >
      <div className="register-input-password-container change-password-container">
        <label className="input-password-title change-password-title">
          Change user password
        </label>
        <div className={`change-password-message ${passwordMessageColor}`}>
          {passwordMessage}
        </div>
        <div className="input-password-register-wrapper">
          <input
            className="register-input-password input-field"
            type={showOldPassword ? "text" : "password"}
            placeholder="Previous Password"
            data-tooltip-id="oldPassword-tooltip"
            data-tooltip-content={errors.oldPassword?.message}
            {...register("oldPassword", {
              required: "Password is required",
            })}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Tooltip
          id="oldPassword-tooltip"
          place="top"
          variant="error"
          isOpen={!!errors.password}
        />
        <div className="input-password-register-wrapper input-password-register-wrapper_change">
          <input
            className="register-input-password input-field"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            data-tooltip-id="password-tooltip"
            data-tooltip-content={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Must contain 1 uppercase, and 1 number",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Tooltip
          id="password-tooltip"
          place="top"
          variant="error"
          isOpen={!!errors.password}
        />
        <button className="login-button change-button" type="submit">
          Change password
        </button>
        <button
          className="login-button change-button"
          type="submit"
          onClick={() => onClose()}
        >
          Back to profile page
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
