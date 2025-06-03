import { useContext, useEffect, useState } from "react";
import { deleteCustomerAddress } from "../../API/DeleteAddress";
import { ShopContext } from "../../context/shopContext";
import { Address, Customer } from "@commercetools/platform-sdk";
import { getProfile } from "../../API/GetProfile";
import ModalAddAddress from "../modalAddAddress/modalAddAddress";
import "./changeAddress.scss";
import { useNavigate } from "react-router";
import { ClockLoader } from "react-spinners";
import ModalEditAddress from "../modalEditAddress/modalEditAddress";

const ChangeAddress = () => {
  const [profile, setProfile] = useState<Customer | undefined>();
  const [version, setNewVersion] = useState(0);
  const [showAddModal, setShowAddMode] = useState(false);
  const [showEditModal, setShowEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { customerId, isLoginned } = useContext(ShopContext);

  const closeAddModal = () => {
    setShowAddMode(false);
  };
  const closeEditModal = () => {
    setShowEditMode(false);
  };

  useEffect(() => {
    if (isLoginned) {
      const fetchProfile = async () => {
        try {
          const { body } = await getProfile(customerId);
          if (body) {
            setProfile(body);
            setNewVersion(body.version);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfile();
    }
  }, [customerId, isLoginned, version, showAddModal, showEditModal]);

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setShowEditMode(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (version && addressId) {
      deleteCustomerAddress(customerId, version, addressId).then((response) => {
        if (response.statusCode === 200) {
          setNewVersion(response.body.version);
        }
      });
    }
  };

  const navigate = useNavigate();
  if (!isLoginned) {
    navigate("/login");
  }

  if (!profile) {
    return <ClockLoader size={150} color="#8b4513" />;
  }

  return (
    <div>
      {profile?.addresses.map((address) => {
        console.log(address.id && version);

        return (
          <div
            className="register-input-adress-container"
            key={`${address.id}${version}`}
          >
            <label className="input-country-title">
              {profile.shippingAddressIds?.find((id) => id == address.id)
                ? "Shipping address"
                : profile.billingAddressIds?.find((id) => id == address.id)
                  ? "Billing address"
                  : "Address"}
            </label>
            <div className="adress-containers">
              <div className="register-input-country">
                <select
                  className="adress-select"
                  disabled={true}
                  data-tooltip-id="country-tooltip"
                  defaultValue={address.country}
                >
                  <option value="">Choose country</option>
                  <option value="US">United States</option>
                  <option value="GB">Great Britain</option>
                </select>
              </div>
              <div className="register-input-postalcode">
                <input
                  type="text"
                  className="adress-input"
                  disabled={true}
                  defaultValue={address.postalCode}
                  placeholder="Postal Code, ex. 12345"
                />
              </div>
              <div className="register-input-city">
                <input
                  type="text"
                  disabled={true}
                  defaultValue={address.city}
                  className="adress-input"
                  placeholder="City"
                />
              </div>
              <div className="register-input-street">
                <input
                  type="text"
                  className="adress-input"
                  disabled={true}
                  defaultValue={address.streetName}
                  placeholder="Street"
                />
              </div>
              <div className="adress-checkbox-default-container">
                <input
                  type="checkbox"
                  disabled={true}
                  checked={address.id === profile.defaultBillingAddressId}
                  id="default-billing"
                />
                <label htmlFor="default-billing">Default for billing</label>
              </div>
              <div className="adress-checkbox-default-container">
                <input
                  type="checkbox"
                  disabled={true}
                  checked={address.id === profile.defaultShippingAddressId}
                  id="default-shipping"
                />
                <label htmlFor="default-shipping">Default for shipping</label>
              </div>
            </div>
            <div className="profile-button_container">
              <div
                className="login-button profile-button_edit"
                onClick={() => {
                  handleEditAddress(address);
                }}
              >
                Edit
              </div>
              <div
                className="login-button profile-button_edit"
                onClick={() => handleDeleteAddress(address.id || "")}
              >
                Delete
              </div>
            </div>
          </div>
        );
      })}
      <button
        className="login-button profile-button_edit"
        onClick={() => setShowAddMode(true)}
      >
        Add address
      </button>
      <button
        className="login-button profile-button_edit"
        onClick={() => navigate("/profile")}
      >
        Back to profile page
      </button>
      {showAddModal && (
        <ModalAddAddress version={version} closeModal={closeAddModal} />
      )}
      {showEditModal && selectedAddress && (
        <ModalEditAddress
          version={version}
          closeModal={closeEditModal}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default ChangeAddress;
