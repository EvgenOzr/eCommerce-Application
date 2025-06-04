import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addAddressType,
  defaultAddressType,
  modalAddAddressType,
  RegistrationFormData,
} from "../../types/shopTypes";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/shopContext";
import { CustomerUpdate } from "@commercetools/platform-sdk";
import { setUserProfile } from "../../API/SetProfile";
import "./modalAddAddress.scss";

const ModalAddAddress = ({ version, closeModal }: modalAddAddressType) => {
  const { customerId, isLoginned } = useContext(ShopContext);
  const [typeAddress, setTypeAddress] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(false);
  const [defaultShipping, setDefaultShipping] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: "all" });

  const navigate = useNavigate();

  const addNewAddress: SubmitHandler<
    Pick<RegistrationFormData, "billingAdresses">
  > = (data) => {
    const updateData: CustomerUpdate = {
      version: version,
      actions: [
        {
          action: "addAddress",
          address: {
            country: data.billingAdresses.country,
            postalCode: data.billingAdresses.postalcode,
            city: data.billingAdresses.city,
            streetName: data.billingAdresses.street,
          },
        },
      ],
    };
    setUserProfile(customerId, updateData)
      .then((response) => {
        if (response.statusCode === 200) {
          console.log(typeAddress);

          const updateType: CustomerUpdate = {
            version: response.body.version,
            actions: [
              {
                action: !typeAddress
                  ? addAddressType.addBillingAddress
                  : addAddressType.addShippingAddress,
                addressId:
                  response.body.addresses[response.body.addresses.length - 1]
                    .id,
              },
            ],
          };
          setUserProfile(customerId, updateType).then((response) => {
            if (response.statusCode === 200) {
              if (defaultBilling || defaultShipping) {
                const updateDefault: CustomerUpdate = {
                  version: response.body.version,
                  actions: [
                    {
                      action: defaultBilling
                        ? defaultAddressType.defaultBillingAddress
                        : defaultAddressType.defaultShippingAddress,
                      addressId:
                        response.body.addresses[
                          response.body.addresses.length - 1
                        ].id,
                    },
                  ],
                };
                setUserProfile(customerId, updateDefault);
              }
            }
          });
        }
      })
      .then(closeModal)
      .catch((err) => console.log("Error:", err));
  };
  if (!isLoginned) {
    navigate("/login");
  }

  return (
    <div className="modal-overlay_add" onClick={closeModal}>
      <div
        className="modal-overlay_content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close_button" onClick={closeModal}>
          &times;
        </span>

        <div className="register-form-container">
          <h2 className="register-form-title">Add new address</h2>
          <form
            className="register-form-submit"
            action="submit"
            onSubmit={handleSubmit(addNewAddress)}
          >
            <div className="register-input-adress-container">
              <select
                className="adress-select"
                onChange={() => setTypeAddress(!typeAddress)}
              >
                <option value="Billing">Billing address</option>
                <option value="Shipping">Shipping address</option>
              </select>
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
                      required: "Postalcode is required",
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
                    data-tooltip-content={errors.billingAdresses?.city?.message}
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
            </div>
            <div
              className="adress-checkbox-default-container"
              style={typeAddress ? { display: "none" } : { display: "flex" }}
            >
              <input
                type="checkbox"
                onChange={(e) => setDefaultBilling(e.target.checked)}
              />
              <label htmlFor="default-billing">Default for billing</label>
            </div>
            <div
              className="adress-checkbox-default-container"
              style={!typeAddress ? { display: "none" } : { display: "flex" }}
            >
              <input
                type="checkbox"
                onChange={(e) => setDefaultShipping(e.target.checked)}
              />
              <label htmlFor="default-billing">Default for shipping</label>
            </div>
            <button type="submit" className="login-button">
              Add address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddAddress;
