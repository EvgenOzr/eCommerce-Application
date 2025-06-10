import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ShopContext } from "../../context/shopContext";
import ChangeAddress from "./changeAddress";
import { Customer, Address } from "@commercetools/platform-sdk";
import { getProfile } from "../../API/GetProfile";
import { deleteCustomerAddress } from "../../API/DeleteAddress";

vi.mock("../../API/GetProfile");
vi.mock("../../API/DeleteAddress");
vi.mock("../modalAddAddress/modalAddAddress", () => ({
  default: () => <div>Add Address Modal</div>,
}));
vi.mock("../modalEditAddress/modalEditAddress", () => ({
  default: () => <div>Edit Address Modal</div>,
}));

const mockCustomer: Customer = {
  id: "customer-1",
  version: 1,
  createdAt: "2023-01-01",
  lastModifiedAt: "2023-01-01",
  email: "test@example.com",
  addresses: [
    {
      id: "address-1",
      country: "US",
      city: "New York",
      postalCode: "10001",
      streetName: "5th Avenue",
    } as Address,
    {
      id: "address-2",
      country: "GB",
      city: "London",
      postalCode: "SW1A 1AA",
      streetName: "Downing Street",
    } as Address,
  ],
  shippingAddressIds: ["address-1"],
  billingAddressIds: ["address-2"],
  defaultShippingAddressId: "address-1",
  defaultBillingAddressId: "address-2",
  isEmailVerified: false,
  authenticationMode: "Password",
  stores: [],
};

describe("ChangeAddress Component", () => {
  const mockContextValue = {
    login: "test@example.com",
    isLoginned: true,
    customerId: "customer-1",
    anonymousId: "anon-123",
    cart: null,
    setLogin: vi.fn(),
    setIsLoginned: vi.fn(),
    setCustomerId: vi.fn(),
    setAnonymousId: vi.fn(),
    setCart: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(getProfile).mockResolvedValue({ body: mockCustomer });
    vi.mocked(deleteCustomerAddress).mockResolvedValue({
      statusCode: 200,
      body: { ...mockCustomer, version: mockCustomer.version + 1 },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner initially", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());
  });

  it("displays all addresses when loaded", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Shipping address")).toBeInTheDocument();
      expect(screen.getByText("Billing address")).toBeInTheDocument();
      expect(screen.getByDisplayValue("New York")).toBeInTheDocument();
      expect(screen.getByDisplayValue("London")).toBeInTheDocument();
    });
  });

  it('shows "No addresses added" when no addresses exist', async () => {
    vi.mocked(getProfile).mockResolvedValue({
      body: { ...mockCustomer, addresses: [] },
    });

    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No adresses added")).toBeInTheDocument();
    });
  });

  it("opens add address modal when button clicked", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Add address"));
      expect(screen.getByText("Add Address Modal")).toBeInTheDocument();
    });
  });

  it("opens edit modal when edit button clicked", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Edit")[0]);
      expect(screen.getByText("Edit Address Modal")).toBeInTheDocument();
    });
  });

  it("calls delete API when delete button clicked", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Delete")[0]);
      expect(deleteCustomerAddress).toHaveBeenCalledWith(
        "customer-1",
        1,
        "address-1"
      );
    });
  });

  it("shows default address indicators", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <ChangeAddress />
        </MemoryRouter>
      </ShopContext.Provider>
    );

    await waitFor(() => {
      const defaultBillingCheckbox = screen.getByLabelText(
        "Default for billing"
      );
      const defaultShippingCheckbox = screen.getByLabelText(
        "Default for shipping"
      );

      expect(defaultBillingCheckbox).toBeChecked();
      expect(defaultShippingCheckbox).toBeChecked();
    });
  });
});
