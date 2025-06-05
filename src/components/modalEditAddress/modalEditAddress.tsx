import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  defaultAddressType,
  modalEditAddressType,
  RegistrationFormData,
} from "../../types/shopTypes";
import { useNavigate } from "react-router";
import { ShopContext } from "../../context/shopContext";
import { CustomerUpdate } from "@commercetools/platform-sdk";
import { setUserProfile } from "../../API/SetProfile";
import "./modalEditAddress.scss";

const ModalEditAddress = ({
  version,
  closeModal,
  address,
  profile,
}: modalEditAddressType) => {
  const { customerId, isLoginned } = useContext(ShopContext);
  const [typeAddress, setTypeAddress] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: "all" });

  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      reset({
        billingAdresses: {
          country: address.country,
          postalcode: address.postalCode,
          city: address.city,
          street: address.streetName,
        },
      });
    }
  }, [address, reset]);

  useEffect(() => {
    if (profile.billingAddressIds?.find((item) => item == address.id)) {
      if (profile.defaultBillingAddressId == address.id) {
        setIsDefault(true);
      }
    }
    if (profile.shippingAddressIds?.find((item) => item == address.id)) {
      setTypeAddress(true);
      if (profile.defaultShippingAddressId == address.id) {
        setIsDefault(true);
      }
    }
  }, [address.id, profile]);

  const editAddress: SubmitHandler<
    Pick<RegistrationFormData, "billingAdresses">
  > = (data) => {
    const updateData: CustomerUpdate = {
      version: version,
      actions: [
        {
          action: "changeAddress",
          addressId: address.id,
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
          const updateDefault: CustomerUpdate = {
            version: response.body.version,
            actions: [
              {
                action: !typeAddress
                  ? defaultAddressType.defaultBillingAddress
                  : defaultAddressType.defaultShippingAddress,
                addressId: isDefault ? address.id : undefined,
              },
            ],
          };
          setUserProfile(customerId, updateDefault).then(closeModal);
        }
      })
      .catch((err) => console.log("Error:", err));
  };

  if (!isLoginned) {
    navigate("/login");
  }

  return (
    <div className="modal-overlay_add" onClick={closeModal}>
      <div
        className="modal-overlay_add_content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close_button" onClick={closeModal}>
          &times;
        </span>
        <div className="register-form-container">
          <h2 className="register-form-title">Edit address</h2>
          <form
            className="register-form-submit"
            action="submit"
            onSubmit={handleSubmit(editAddress)}
          >
            <div className="register-input-adress-container">
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
            <div className="adress-checkbox-default-container">
              <input
                type="checkbox"
                onChange={(e) => setIsDefault(e.target.checked)}
                checked={isDefault}
              />
              <label htmlFor="default-billing">
                Default for {!typeAddress ? "billing" : "shipping"}
              </label>
            </div>
            <button type="submit" className="login-button">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAddress;
