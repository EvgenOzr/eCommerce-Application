import { SubmitHandler, useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import "./RegPage.scss";
import { Link, useNavigate } from "react-router";
import { RegistrationFormData } from "../../types/shopTypes";

import { useState } from "react";
import { registrationRequestResponse } from "../../API/RegisterUse";
import { authRequestResponse } from "../../API/AuthUser";

export default function RegPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: "all" });

  const navigate = useNavigate();

  const [defaultAdress, setDefaultAdress] = useState(true);

  const formSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      await registrationRequestResponse(data);
      await authRequestResponse(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
              <div className="register-input-firstname-container">
                <label className="register-input-name-title">NAME</label>
                <input
                  className="register-input-firstname input-field"
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
                  className="register-input-lastname input-field"
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
                <label className="input-country-title">BILLING ADRESS</label>
                <div className="adress-containers">
                  <div className="register-input-country">
                    <select
                      className="adress-select"
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={
                        errors.billingAdresses?.country?.message
                      }
                      {...register("billingAdresses.country", {
                        required: "Contry is required",
                      })}
                    >
                      <option value="">Choose country</option>
                      <option value="US">United States</option>
                      <option value="GB">Great Britain</option>
                    </select>
                    <Tooltip
                      id="country-tooltip"
                      place="top"
                      variant="error"
                      isOpen={!!errors.billingAdresses?.country}
                    />
                  </div>
                  <div className="register-input-postalcode">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="Postal Code, ex. 12345"
                      data-tooltip-id="postalcode-tooltip"
                      data-tooltip-content={
                        errors.billingAdresses?.postalcode?.message
                      }
                      {...register("billingAdresses.postalcode", {
                        required: "City is required",
                        pattern: {
                          value:
                            /^(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d)$/,
                          message: "Incorrect postal code format",
                        },
                      })}
                    />
                    <Tooltip
                      id="postalcode-tooltip"
                      place="top"
                      variant="error"
                      isOpen={!!errors.billingAdresses?.postalcode}
                    />
                  </div>
                  <div className="register-input-city">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="City"
                      data-tooltip-id="city-tooltip"
                      data-tooltip-content={
                        errors.billingAdresses?.city?.message
                      }
                      {...register("billingAdresses.city", {
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
                      isOpen={!!errors.billingAdresses?.city}
                    />
                  </div>
                  <div className="register-input-street">
                    <input
                      type="text"
                      className="adress-input"
                      placeholder="Street"
                      data-tooltip-id="street-tooltip"
                      data-tooltip-content={
                        errors.billingAdresses?.street?.message
                      }
                      {...register("billingAdresses.street", {
                        required: "Street is required",
                      })}
                    />
                    <Tooltip
                      id="street-tooltip"
                      place="top"
                      variant="error"
                      isOpen={!!errors.billingAdresses?.street}
                    />
                  </div>
                </div>
                <div className="adress-checkbox-container">
                  <input
                    type="checkbox"
                    checked={defaultAdress}
                    id="default-adress"
                    onChange={(e) => setDefaultAdress(e.target.checked)}
                  />
                  <label htmlFor="default-adress">
                    Use same address for shipping
                  </label>
                </div>
              </div>
              {!defaultAdress && (
                <div className="register-input-adress-container">
                  <label className="input-country-title">SHIPPING ADRESS</label>
                  <div className="adress-containers">
                    <div className="register-input-country">
                      <select
                        className="adress-select"
                        data-tooltip-id="country-tooltip"
                        data-tooltip-content={
                          errors.shippingAdresses?.country?.message
                        }
                        {...register("shippingAdresses.country", {
                          required: !defaultAdress && "Contry is required",
                        })}
                      >
                        <option value="">Choose country</option>
                        <option value="US">United States</option>
                        <option value="GB">Great Britain</option>
                      </select>
                      <Tooltip
                        id="country-tooltip"
                        place="top"
                        variant="error"
                        isOpen={!!errors.shippingAdresses?.country}
                      />
                    </div>
                    <div className="register-input-postalcode">
                      <input
                        type="text"
                        className="adress-input"
                        placeholder="Postal Code, ex. 12345"
                        data-tooltip-id="postalcode-tooltip"
                        data-tooltip-content={
                          errors.shippingAdresses?.postalcode?.message
                        }
                        {...register("shippingAdresses.postalcode", {
                          required: !defaultAdress && "City is required",
                          pattern: {
                            value:
                              /^(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d)$/,
                            message: "Incorrect postal code format",
                          },
                        })}
                      />
                      <Tooltip
                        id="postalcode-tooltip"
                        place="top"
                        variant="error"
                        isOpen={!!errors.shippingAdresses?.postalcode}
                      />
                    </div>
                    <div className="register-input-city">
                      <input
                        type="text"
                        className="adress-input"
                        placeholder="City"
                        data-tooltip-id="city-tooltip"
                        data-tooltip-content={
                          errors.shippingAdresses?.city?.message
                        }
                        {...register("shippingAdresses.city", {
                          required: !defaultAdress && "City is required",
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
                        isOpen={!!errors.shippingAdresses?.city}
                      />
                    </div>
                    <div className="register-input-street">
                      <input
                        type="text"
                        className="adress-input"
                        placeholder="Street"
                        data-tooltip-id="street-tooltip"
                        data-tooltip-content={
                          errors.shippingAdresses?.street?.message
                        }
                        {...register("shippingAdresses.street", {
                          required: !defaultAdress && "Street is required",
                        })}
                      />
                      <Tooltip
                        id="street-tooltip"
                        place="top"
                        variant="error"
                        isOpen={!!errors.shippingAdresses?.street}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="register-input-date-container">
                <label className="register-input-name-title">BIRTHDAY</label>
                <input
                  className="register-input-date input-field"
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
                  className="register-input-email input-field"
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
                  className="register-input-password input-field"
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
