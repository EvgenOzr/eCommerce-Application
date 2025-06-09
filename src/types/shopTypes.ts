import { Address, Category, Customer } from "@commercetools/platform-sdk";
import { Cart } from "@commercetools/platform-sdk";
import { ProductProjection } from "@commercetools/platform-sdk";

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
  anonymousId: string;
  cart: Cart | null;
  setLogin: (login: string) => void;
  setIsLoginned: (isLoginned: boolean) => void;
  setCustomerId: (customerId: string) => void;
  setAnonymousId: (anonymousId: string) => void;
  setCart: (cart: Cart | null) => void;
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

export enum defaultAddressType {
  defaultBillingAddress = "setDefaultBillingAddress",
  defaultShippingAddress = "setDefaultShippingAddress",
}

export enum addAddressType {
  addBillingAddress = "addBillingAddressId",
  addShippingAddress = "addShippingAddressId",
}

export interface modalAddAddressType {
  version: number;
  closeModal: () => void;
}

export interface modalEditAddressType {
  version: number;
  closeModal: () => void;
  address: Address;
  profile: Customer;
}

export type SortProps = {
  sortOption: string;
  setSortOption: (value: string) => void;
  setSearchParams: (
    updater: (prev: URLSearchParams) => URLSearchParams
  ) => void;
};

export type ButtonProps = {
  className: string;
  value: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

export type ProductItems = {
  product: ProductProjection;
  onClick: (productId: string) => void;
};
