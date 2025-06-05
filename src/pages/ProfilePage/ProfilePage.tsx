import { useContext, useEffect, useState } from "react";
import { getProfile } from "../../API/GetProfile";
import { Customer, CustomerUpdate } from "@commercetools/platform-sdk";
import { ShopContext } from "../../context/shopContext";
import "../RegistrationPage/RegPage.scss";
import "./ProfilePage.scss";
import { useNavigate } from "react-router";
import { setUserProfile } from "../../API/SetProfile";
import { Tooltip } from "react-tooltip";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegistrationFormData } from "../../types/shopTypes";
import ChangePassword from "../../components/changePassword/ChangePassword";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({ mode: "all" });

  const [profile, setProfile] = useState<Customer | undefined>();
  const { customerId, isLoginned } = useContext(ShopContext);
  const [version, setNewVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [changePassMode, setChangePassMode] = useState(false);

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
  }, [customerId, isLoginned]);

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        date: profile.dateOfBirth,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const navigate = useNavigate();

  if (!isLoginned) {
    navigate("/login");
  }

  const saveProfileHandle: SubmitHandler<
    Omit<RegistrationFormData, "password">
  > = (data) => {
    if (profile) {
      const updateData: CustomerUpdate = {
        version: version,
        actions: [
          { action: "setFirstName", firstName: data.firstName },
          { action: "setLastName", lastName: data.lastName },
          { action: "setDateOfBirth", dateOfBirth: data.date },
          { action: "changeEmail", email: data.email },
        ],
      };
      setUserProfile(customerId, updateData)
        .then((updatedCustomer) => {
          setNewVersion(updatedCustomer.body.version);
          setEditMode(false);
        })
        .catch((err) => console.log("Error:", err));
    }
  };

  return (
    <>
      {changePassMode ? (
        <ChangePassword
          version={version}
          onClose={() => setChangePassMode(false)}
        />
      ) : (
        <div className="register-form-container">
          <h2 className="register-form-title">profile</h2>
          <form
            className="register-form-submit"
            action="submit"
            onSubmit={handleSubmit(saveProfileHandle)}
          >
            <div className="register-input-firstname-container">
              <label className="register-input-name-title">NAME</label>
              <input
                className="register-input-firstname input-field"
                type="text"
                disabled={!editMode}
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
                disabled={!editMode}
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
            <div className="register-input-date-container">
              <label className="register-input-name-title">BIRTHDAY</label>
              <input
                className="register-input-date input-field"
                type="date"
                disabled={!editMode}
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
                disabled={!editMode}
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
            <div className="button-login-container">
              <button
                type="button"
                className="login-button profile-button_edit"
                style={{ display: !editMode ? "block" : "none" }}
                onClick={() => setEditMode(true)}
              >
                Edit profile
              </button>
              <button
                type="submit"
                className="login-button profile-button_edit"
                style={{ display: editMode ? "block" : "none" }}
              >
                Save changes
              </button>
              <button
                className="login-button profile-button_edit"
                onClick={() => setChangePassMode(true)}
              >
                Change password
              </button>
              <button
                className="login-button profile-button_edit"
                onClick={() => navigate("/profile/address")}
              >
                Change addresses
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
