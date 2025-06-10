import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ShopContext } from "../../context/shopContext";
import { changeUserPassword } from "../../API/ChangeUserPassword";
import { Customer } from "@commercetools/platform-sdk";
import ChangePassword from "./ChangePassword";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
vi.spyOn(console, "log").mockImplementation(() => {});
vi.mock("../../API/ChangeUserPassword");
vi.mock("react-icons/fa", () => ({
  FaEye: () => <span>EyeIcon</span>,
  FaEyeSlash: () => <span>EyeSlashIcon</span>,
}));

const mockSuccessResponse = {
  statusCode: 200,
  body: {
    id: "customer-123",
    version: 2,
    email: "test@example.com",
    addresses: [],
    isEmailVerified: false,
    createdAt: "2023-01-01",
    lastModifiedAt: "2023-01-01",
    authenticationMode: "Password",
  } as unknown as Customer,
};

describe("ChangePassword Component", () => {
  const mockOnClose = vi.fn();
  const mockContextValue = {
    customerId: "customer-123",
    login: "test@example.com",
    isLoginned: true,
    anonymousId: "",
    cart: null,
    setLogin: vi.fn(),
    setIsLoginned: vi.fn(),
    setCustomerId: vi.fn(),
    setAnonymousId: vi.fn(),
    setCart: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(changeUserPassword).mockResolvedValue(mockSuccessResponse);
  });

  it("renders correctly", () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <ChangePassword version={1} onClose={mockOnClose} />
      </ShopContext.Provider>
    );

    expect(screen.getByText("Change user password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Previous Password")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New password")).toBeInTheDocument();
    expect(screen.getByText("Change password")).toBeInTheDocument();
    expect(screen.getByText("Back to profile page")).toBeInTheDocument();
  });

  it("shows/hides password when toggle button clicked", () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <ChangePassword version={1} onClose={mockOnClose} />
      </ShopContext.Provider>
    );

    const passwordInput = screen.getByPlaceholderText("New password");
    const toggleButtons = screen.getAllByRole("button", {
      name: /EyeIcon|EyeSlashIcon/,
    });

    fireEvent.click(toggleButtons[1]);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(toggleButtons[1]);
    expect(passwordInput).toHaveAttribute("type", "password");

    const oldPasswordInput = screen.getByPlaceholderText("Previous Password");
    fireEvent.click(toggleButtons[0]);
    expect(oldPasswordInput).toHaveAttribute("type", "text");
    fireEvent.click(toggleButtons[0]);
    expect(oldPasswordInput).toHaveAttribute("type", "password");
  });

  it("submits form with valid data", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <ChangePassword version={1} onClose={mockOnClose} />
      </ShopContext.Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Previous Password"), {
        target: { value: "OldPassword123" },
      });
      fireEvent.change(screen.getByPlaceholderText("New password"), {
        target: { value: "NewPassword123" },
      });
      fireEvent.click(screen.getByText("Change password"));
    });

    await waitFor(() => {
      expect(changeUserPassword).toHaveBeenCalledWith({
        id: "customer-123",
        version: 1,
        currentPassword: "OldPassword123",
        newPassword: "NewPassword123",
      });
    });
  });

  it("shows success message and closes on successful password change", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <ChangePassword version={1} onClose={mockOnClose} />
      </ShopContext.Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Previous Password"), {
        target: { value: "OldPassword123" },
      });
      fireEvent.change(screen.getByPlaceholderText("New password"), {
        target: { value: "NewPassword123" },
      });
      fireEvent.click(screen.getByText("Change password"));
    });

    await waitFor(() => {
      expect(screen.getByText("Password changed")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalled();
      },
      { timeout: 1500 }
    );
  });

  it("closes form when back button is clicked", async () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <ChangePassword version={1} onClose={mockOnClose} />
      </ShopContext.Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Back to profile page"));
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
