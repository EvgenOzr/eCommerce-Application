import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalAddAddress from "./modalAddAddress";
import { ShopContext } from "../../context/shopContext";
import { useNavigate } from "react-router";
import { setUserProfile } from "../../API/SetProfile";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock("../../API/SetProfile", () => ({
  setUserProfile: vi.fn(),
}));

vi.mock("react-tooltip", () => ({
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe("ModalAddAddress", () => {
  const mockCloseModal = vi.fn();
  const mockNavigate = vi.fn();
  const mockSetUserProfile = vi.fn();

  const mockContext = {
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
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (setUserProfile as Mock).mockImplementation(mockSetUserProfile);
  });

  const renderComponent = () => {
    return render(
      <ShopContext.Provider value={mockContext}>
        <ModalAddAddress version={1} closeModal={mockCloseModal} />
      </ShopContext.Provider>
    );
  };

  it("should render the modal with correct title", () => {
    renderComponent();
    expect(screen.getByText("Add new address")).toBeInTheDocument();
  });

  it("should close modal when clicking close button", async () => {
    renderComponent();
    const closeButton = screen.getByText("×");
    await userEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("should close modal when clicking outside content", async () => {
    renderComponent();
    const overlay = screen.getByTestId("modal-overlay");
    await userEvent.click(overlay);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("should not close modal when clicking inside content", async () => {
    renderComponent();
    const content = screen.getByTestId("modal-content");
    await userEvent.click(content);
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it("should redirect to login if user is not logged in", () => {
    render(
      <ShopContext.Provider value={{ ...mockContext, isLoginned: false }}>
        <ModalAddAddress version={1} closeModal={mockCloseModal} />
      </ShopContext.Provider>
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
