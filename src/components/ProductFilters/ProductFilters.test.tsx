import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSearchParams } from "react-router";
import { FilterSidebar } from "./ProductFilters";

vi.mock("react-router", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    useTheme: vi.fn(),
    Slider: vi.fn((props) => (
      <input type="range" {...props} data-testid="slider" />
    )),
    Checkbox: vi.fn((props) => <input type="checkbox" {...props} />),
    Button: vi.fn((props) => <button {...props} />),
  };
});

vi.mock("react-icons/bi", () => ({
  BiChevronDown: vi.fn(() => <div>Down</div>),
  BiChevronUp: vi.fn(() => <div>Up</div>),
}));

const mockBrandOptions = [
  { key: "brand1", label: "Brand 1" },
  { key: "brand2", label: "Brand 2" },
];

const mockColorOptions = [
  { key: "color1", label: "Red" },
  { key: "color2", label: "Blue" },
];

const mockSizeOptions = [
  { key: "size1", label: "S" },
  { key: "size2", label: "M" },
];

describe("FilterSidebar Component", () => {
  const mockSetSearchParams = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    vi.mocked(useMediaQuery).mockReturnValue(false);
    vi.mocked(useTheme).mockReturnValue({ breakpoints: { down: () => false } });
    mockSetSearchParams.mockClear();
  });

  it("renders all filter sections", () => {
    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByText("Apply Filters")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("initializes price range from URL params", () => {
    const params = new URLSearchParams();
    params.set("priceMin", "20");
    params.set("priceMax", "80");
    vi.mocked(useSearchParams).mockReturnValue([params, mockSetSearchParams]);

    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    expect(screen.getByText("Min: 20")).toBeInTheDocument();
    expect(screen.getByText("Max: 80")).toBeInTheDocument();
  });

  it("toggles brand selection", () => {
    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    const brandCheckbox = screen.getByLabelText("Brand 1");
    fireEvent.click(brandCheckbox);
    expect(brandCheckbox).toBeChecked();
  });

  it("applies filters when button is clicked", () => {
    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    fireEvent.click(screen.getByText("Apply Filters"));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("resets filters when reset button is clicked", () => {
    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    fireEvent.click(screen.getByText("Reset"));
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it("shows mobile toggle button on small screens", () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    expect(screen.getByText("Down")).toBeInTheDocument();
  });

  it("toggles visibility when mobile button is clicked", () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    fireEvent.click(screen.getByText("Down"));
    expect(screen.getByText("Up")).toBeInTheDocument();
  });

  it("initializes selected filters from URL params", () => {
    const params = new URLSearchParams();
    params.append("brand", "brand1");
    params.append("color", "color2");
    params.append("size", "size1");
    vi.mocked(useSearchParams).mockReturnValue([params, mockSetSearchParams]);

    render(
      <FilterSidebar
        priceMinLimit={0}
        priceMaxLimit={100}
        brandOptions={mockBrandOptions}
        colorOptions={mockColorOptions}
        sizeOptions={mockSizeOptions}
      />
    );

    expect(screen.getByLabelText("Brand 1")).toBeChecked();
    expect(screen.getByLabelText("Blue")).toBeChecked();
    expect(screen.getByLabelText("S")).toBeChecked();
  });
});
