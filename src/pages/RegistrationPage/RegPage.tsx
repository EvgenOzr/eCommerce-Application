import { SubmitHandler, useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import "./RegPage.scss";
import { Link } from "react-router";
import { RegistrationFormData } from "../../types/shopTypes";

export default function RegPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: "all" });

  const formSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="register-wrapper">
        <div className="register-image"></div>
        <div className="register-container">
          <div className="register-form-container">
            <h2 className="register-form-title">Register</h2>
            <form
              className="register-form-submit"
              action="submit"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="register-input-name-container">
                <label className="register-input-name-title">NAME</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="Ivan"
                  data-tooltip-id="name-tooltip"
                  data-tooltip-content={errors.firstName?.message}
                  {...register("firstName", {
                    required: "Name is required",
                  })}
                />
                <Tooltip
                  id="name-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.firstName}
                />
              </div>
              <div className="register-input-name-container">
                <label className="register-input-name-title">LASTNAME</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="Ivanov"
                  data-tooltip-id="lastname-tooltip"
                  data-tooltip-content={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Lastname is required",
                  })}
                />
                <Tooltip
                  id="lastname-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.lastName}
                />
              </div>
              <div className="register-input-name-container">
                <label className="register-input-name-title">BIRTHDAY</label>
                <input
                  className="input-name"
                  type="date"
                  data-tooltip-id="date-tooltip"
                  data-tooltip-content={errors.date?.message}
                  {...register("date", {
                    required: "Date is required",
                  })}
                />
                <Tooltip
                  id="date-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.date}
                />
              </div>
              <div className="register-input-name-container">
                <label className="register-input-name-title">EMAIL</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="example@mail.com"
                  data-tooltip-id="email-tooltip"
                  data-tooltip-content={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Tooltip
                  id="email-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.email}
                />
              </div>
              <div className="input-password-container">
                <label className="input-password-title">PASSWORD</label>
                <input
                  className="input-password"
                  type="password"
                  placeholder="******"
                  data-tooltip-id="password-tooltip"
                  data-tooltip-content={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <Tooltip
                  id="password-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.password}
                />
              </div>
              <div className="button-login-container">
                <button type="submit" className="login-button">
                  Register
                </button>
              </div>
              <div className="nav-link">
                <h2 className="login-link">
                  Already have an account? <Link to={"/login"}>Login!</Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
