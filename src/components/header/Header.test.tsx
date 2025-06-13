import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import Header from "./Header";
import { ShopContext } from "../../context/shopContext";

const mockContext = {
  login: "",
  isLoginned: false,
  customerId: "customer-1",
  anonymousId: "anon-123",
  cart: null,
  setLogin: vi.fn(),
  setIsLoginned: vi.fn(),
  setCustomerId: vi.fn(),
  setAnonymousId: vi.fn(),
  setCart: vi.fn(),
};

describe("Header Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderHeader = (contextValues = mockContext) => {
    return render(
      <Router>
        <ShopContext.Provider value={contextValues}>
          <Header />
        </ShopContext.Provider>
      </Router>
    );
  };

  it("renders correctly", () => {
    renderHeader();
    expect(screen.getByText("modeva")).toBeInTheDocument();
    expect(screen.getByText("Main page")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
  });

  it("toggles mobile menu when burger is clicked", () => {
    renderHeader();
    const burger = screen.getByTestId("burger-button");
    const menu = screen.getByTestId("menu");
    expect(menu).not.toHaveClass("active");

    fireEvent.click(burger);
    expect(menu).toHaveClass("active");

    fireEvent.click(burger);
    expect(menu).not.toHaveClass("active");
  });

  it("shows user icon with correct link when not logged in", () => {
    renderHeader();
    const userLink = screen.getByLabelText("Login");
    expect(userLink).toHaveAttribute("href", "/login");
  });

  it("shows user icon with profile link when logged in", () => {
    renderHeader({ ...mockContext, isLoginned: true });
    const userLink = screen.getByLabelText("User profile");
    expect(userLink).toHaveAttribute("href", "/profile");
  });

  it("handles logout correctly", () => {
    localStorage.setItem("Token", "test-token");
    localStorage.setItem("customerId", "123");

    renderHeader({ ...mockContext, isLoginned: true });

    const logoutLink = screen.getByLabelText("Logout");
    fireEvent.click(logoutLink);

    expect(mockContext.setLogin).toHaveBeenCalledWith("");
    expect(mockContext.setIsLoginned).toHaveBeenCalledWith(false);
    expect(localStorage.getItem("Token")).toBeNull();
    expect(localStorage.getItem("customerId")).toBeNull();
  });

  it("applies correct styles when logged in", () => {
    const { container } = renderHeader({ ...mockContext, isLoginned: true });

    const userIcon = container.querySelector(".header_active__user");
    const exitIcon = container.querySelector(".header_active__exit");

    expect(userIcon).toHaveClass("header_active__user_logined");
    expect(exitIcon).toHaveClass("header_active__exit_logined");
  });
});
