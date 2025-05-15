export interface BannerProps {
  textMain: string;
  textAdd: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  billingAdresses: {
    country: string;
    city: string;
    street: string;
    postalcode: string;
  };
  shippingAdresses: {
    country: string;
    city: string;
    street: string;
    postalcode: string;
  };
  date: string;
  email: string;
  password: string;
}
