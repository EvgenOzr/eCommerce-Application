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
  console.log(errors);

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
              <div className="register-input-firstname-container">
                <label className="register-input-name-title">NAME</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="Ivan"
                  data-tooltip-id="name-tooltip"
                  data-tooltip-content={errors.firstName?.message}
                  {...register("firstName", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]+$/,
                      message: "No numbers or special characters allowed",
                    },
                    minLength: {
                      value: 1,
                      message: "Must contain at least one character",
                    },
                  })}
                />
                <Tooltip
                  id="name-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.firstName}
                />
              </div>
              <div className="register-input-lastname-container">
                <label className="register-input-name-title">LASTNAME</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="Ivanov"
                  data-tooltip-id="lastname-tooltip"
                  data-tooltip-content={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Lastname is required",
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]+$/,
                      message: "No numbers or special characters allowed",
                    },
                    minLength: {
                      value: 1,
                      message: "Must contain at least one character",
                    },
                  })}
                />
                <Tooltip
                  id="lastname-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.lastName}
                />
              </div>
              <div className="register-input-adress-container">
                <label className="input-country-title">ADRESS</label>
                <div className="adress-containers">
                  <div className="register-input-country">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="Country"
                      {...register("adresses.country")}
                    />
                  </div>
                  <div className="register-input-postalcode">
                    <input
                      type="number"
                      className="adress-input"
                      placeholder="Postal Code"
                      {...register("adresses.postalcode")}
                    />
                  </div>
                  <div className="register-input-city">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="City"
                      data-tooltip-id="city-tooltip"
                      data-tooltip-content={errors.adresses?.city?.message}
                      {...register("adresses.city", {
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-zА-Яа-я\s]+$/,
                          message: "Must contain only letters",
                        },
                      })}
                    />
                    <Tooltip
                      id="city-tooltip"
                      place="top"
                      variant="error"
                      isOpen={!!errors.adresses?.city}
                    />
                  </div>
                  <div className="register-input-street">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="Street"
                      data-tooltip-id="street-tooltip"
                      data-tooltip-content={errors.adresses?.street?.message}
                      {...register("adresses.street", {
                        required: "Street is required",
                      })}
                    />
                    <Tooltip
                      id="street-tooltip"
                      place="top"
                      variant="error"
                      isOpen={!!errors.adresses?.street}
                    />
                  </div>
                </div>
              </div>
              <div className="register-input-date-container">
                <label className="register-input-name-title">BIRTHDAY</label>
                <input
                  className="input-name"
                  type="date"
                  data-tooltip-id="date-tooltip"
                  data-tooltip-content={errors.date?.message}
                  {...register("date", {
                    required: "Date is required",
                    validate: (value) => {
                      const birthDate = new Date(value);
                      const today = new Date();
                      const minAgeDate = new Date(
                        today.getFullYear() - 13,
                        today.getMonth(),
                        today.getDate()
                      );

                      if (birthDate > minAgeDate) {
                        return "You must be at least 13 years old";
                      }
                      return true;
                    },
                  })}
                />
                <Tooltip
                  id="date-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.date}
                />
              </div>
              <div className="register-input-email-container">
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
              <div className="register-input-password-container">
                <label className="input-password-title">PASSWORD</label>
                <input
                  className="input-password"
                  type="password"
                  placeholder="******"
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
