import { useContext, useEffect, useState } from "react";
import { getProfile } from "../../API/GetProfile";
import { Customer } from "@commercetools/platform-sdk";
import { ShopContext } from "../../context/shopContext";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [profile, setProfile] = useState<Customer | undefined>();
  const { customerId } = useContext(ShopContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { body } = await getProfile(customerId);
        if (body) setProfile(body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [customerId]);

  return (
    <>
      <div className="profile-title">User Profile</div>
      <div className="profile">
        <div className="profile-field_container">
          <div className="profile-field_title">First Name</div>
          <div className="profile-field_description">{profile?.firstName}</div>
        </div>
        <div className="profile-field_container">
          <div className="profile-field_title">Last Name</div>
          <div className="profile-field_description">{profile?.lastName}</div>
        </div>
        <div className="profile-field_container">
          <div className="profile-field_title">Birthday</div>
          <div className="profile-field_description">
            {profile?.dateOfBirth}
          </div>
        </div>
        <div className="profile-field_container">
          <div className="profile-field_title">Email</div>
          <div className="profile-field_description">{profile?.email}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
