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

export type contextType = {
  login: string;
  isLoginned: boolean;
  customerId: string;
  setLogin: (login: string) => void;
  setIsLoginned: (isLoginned: boolean) => void;
  setCustomerId: (customerId: string) => void;
};

export type ModalType = {
  closeModal: () => void;
  selectedImage: string;
  modalNext: () => void;
  modalPrev: () => void;
};
