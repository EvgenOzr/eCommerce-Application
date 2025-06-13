import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Footer from "./Footer";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Footer Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it("renders all main sections", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Modeva")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("All rights reserved")).toBeInTheDocument();
  });

  it("renders contact information correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();

    const whatsappLink = screen.getByText(": +00 000 0000 000").closest("a");
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/628599999999");
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");

    const emailLink = screen
      .getByText(": dreamstoremakers@gmail.com")
      .closest("a");
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:dreamstoremakers@gmail.com"
    );

    const addressLink = screen
      .getByText(
        ": Lorem ipsum street Block B Number 08, Jakarta, Indonesia, 12345"
      )
      .closest("a");
    expect(addressLink).toHaveAttribute(
      "href",
      expect.stringContaining(
        "https://www.google.com/maps/search/Lorem+ipsum+street"
      )
    );
  });

  it("renders menu items correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.getByText("Formal Men")).toBeInTheDocument();
    expect(screen.getByText("Formal Woman")).toBeInTheDocument();
    expect(screen.getByText("Casual Style")).toBeInTheDocument();
  });

  it("navigates to correct category when menu items are clicked", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    screen.getByText("Formal Men").click();
    expect(mockNavigate).toHaveBeenCalledWith("/products/category/formal-man");

    screen.getByText("Formal Woman").click();
    expect(mockNavigate).toHaveBeenCalledWith(
      "/products/category/formal-woman"
    );

    screen.getByText("Casual Style").click();
    expect(mockNavigate).toHaveBeenCalledWith(
      "/products/category/casual-style"
    );
  });

  it("renders account links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const accountLink = screen.getByText("My Account").closest("a");
    expect(accountLink).toHaveAttribute("href", "/profile");

    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Vouchers and Discounts")).toBeInTheDocument();
  });

  it("renders copyright information", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("All rights reserved")).toBeInTheDocument();
    expect(
      screen.getByText("Copyright 2025 By Dreamstoremakers")
    ).toBeInTheDocument();
  });
});
