import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BreadcrumbsNav } from "./BreadcrumbsNav";
import { Category } from "@commercetools/platform-sdk";
import { getAllCategories } from "../../API/GetAllCategories";

vi.mock("../../API/GetAllCategories", () => ({
  getAllCategories: vi.fn(),
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockCategories: Category[] = [
  {
    id: "1",
    version: 1,
    createdAt: "",
    lastModifiedAt: "",
    key: "electronics",
    name: { "en-GB": "Electronics" },
    slug: { "en-GB": "electronics" },
    ancestors: [],
    orderHint: "",
  },
  {
    id: "2",
    version: 1,
    createdAt: "",
    lastModifiedAt: "",
    key: "phones",
    name: { "en-GB": "Phones" },
    slug: { "en-GB": "phones" },
    ancestors: [{ typeId: "category", id: "1" }],
    orderHint: "",
  },
];

describe("BreadcrumbsNav", () => {
  const mockNavigate = vi.fn();
  const mockUseLocation = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockImplementation(mockUseLocation);
    vi.mocked(mockUseLocation).mockReturnValue({
      pathname: "",
      state: null,
    });
  });

  it("renders basic breadcrumbs without category path", async () => {
    vi.mocked(getAllCategories).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <BreadcrumbsNav />
      </MemoryRouter>
    );

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
    expect(screen.queryByText("Electronics")).not.toBeInTheDocument();
  });

  it("renders category breadcrumbs from pathname", async () => {
    vi.mocked(getAllCategories).mockResolvedValue(mockCategories);
    vi.mocked(mockUseLocation).mockReturnValue({
      pathname: "/products/category/electronics/phones",
      state: null,
    });

    render(
      <MemoryRouter initialEntries={["/products/category/electronics/phones"]}>
        <BreadcrumbsNav />
      </MemoryRouter>
    );

    await screen.findByText("Electronics");

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Phones")).toBeInTheDocument();
  });

  it("renders category breadcrumbs from location state", async () => {
    vi.mocked(getAllCategories).mockResolvedValue(mockCategories);
    vi.mocked(mockUseLocation).mockReturnValue({
      pathname: "/some/other/path",
      state: { categoryPath: "electronics/phones" },
    });

    render(
      <MemoryRouter>
        <BreadcrumbsNav />
      </MemoryRouter>
    );

    await screen.findByText("Electronics");

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Phones")).toBeInTheDocument();
  });

  it("navigates correctly when clicking breadcrumbs", async () => {
    vi.mocked(getAllCategories).mockResolvedValue(mockCategories);
    vi.mocked(mockUseLocation).mockReturnValue({
      pathname: "/products/category/electronics/phones",
      state: null,
    });

    render(
      <MemoryRouter initialEntries={["/products/category/electronics/phones"]}>
        <BreadcrumbsNav />
      </MemoryRouter>
    );

    await screen.findByText("Electronics");

    mockNavigate.mockClear();

    screen.getByText("Main").click();
    expect(mockNavigate).toHaveBeenNthCalledWith(1, "/");

    screen.getByText("Catalog").click();
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "/products");

    screen.getByText("Electronics").click();
    expect(mockNavigate).toHaveBeenNthCalledWith(
      3,
      "/products/category/electronics"
    );

    screen.getByText("Phones").click();
    expect(mockNavigate).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining("/products/category/electronics/phones?reload="),
      { replace: true }
    );
  });

  it("handles missing category data gracefully", async () => {
    vi.mocked(getAllCategories).mockResolvedValue(mockCategories);
    vi.mocked(mockUseLocation).mockReturnValue({
      pathname: "/products/category/electronics/missing-category",
      state: null,
    });

    render(
      <MemoryRouter
        initialEntries={["/products/category/electronics/missing-category"]}
      >
        <BreadcrumbsNav />
      </MemoryRouter>
    );

    await screen.findByText("Electronics");

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.queryByText("missing-category")).not.toBeInTheDocument();
  });
});
