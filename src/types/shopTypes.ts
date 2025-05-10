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
  adresses?: {
    country: string;
    city: string;
    street: string;
    postalcode: number;
  };
  date: string;
  email: string;
  password: string;
}