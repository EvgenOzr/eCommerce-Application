import { Category } from "@commercetools/platform-sdk";

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

export type ChangePasswordType = {
  oldPassword: string;
  password: string;
};

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

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

export type SearchRequest = {
  onSearch: (searchTerm: string) => void;
};

export type Option = { key: string; label: string };

export type FilterSidebarProps = {
  priceMinLimit: number;
  priceMaxLimit: number;
  brandOptions: Option[];
  colorOptions: Option[];
  sizeOptions: Option[];
};

export interface ProductSearchFilters {
  priceMin?: number;
  priceMax?: number;
  color?: string[];
  size?: string[];
  brand?: string[];
}
