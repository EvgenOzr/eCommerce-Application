import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Sort from "./Sort";
import { FIRST_PAGE, SORT_OPTIONS } from "../../types/constants";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Select: vi.fn(({ children, value, onChange, labelId, id }) => (
      <div>
        <label htmlFor={id} id={labelId}>
          Sort By
        </label>
        <select
          id={id}
          aria-labelledby={labelId}
          value={value}
          onChange={onChange}
          data-testid="sort-select"
        >
          {children}
        </select>
      </div>
    )),
    MenuItem: vi.fn(({ children, value }) => (
      <option value={value}>{children}</option>
    )),
    FormControl: vi.fn(({ children }) => <div>{children}</div>),
    InputLabel: vi.fn(({ children, htmlFor }) => (
      <label htmlFor={htmlFor}>{children}</label>
    )),
  };
});

describe("Sort Component", () => {
  const mockSetSortOption = vi.fn();
  const mockSetSearchParams = vi.fn();

  const defaultProps = {
    sortOption: "",
    setSortOption: mockSetSortOption,
    setSearchParams: mockSetSearchParams,
  };

  beforeEach(() => {
    mockSetSortOption.mockClear();
    mockSetSearchParams.mockClear();
  });

  it("renders correctly with default props", () => {
    render(<Sort {...defaultProps} />);

    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
    expect(screen.getByText("Name: A-Z")).toBeInTheDocument();
    expect(screen.getByText("Name: Z-A")).toBeInTheDocument();
  });

  it("displays the current sort option", () => {
    render(<Sort {...defaultProps} sortOption={SORT_OPTIONS.PRICE_ASC} />);
    const select = screen.getByTestId("sort-select") as HTMLSelectElement;
    expect(select.value).toBe(SORT_OPTIONS.PRICE_ASC);
  });

  it("calls setSortOption and setSearchParams when selection changes", () => {
    render(<Sort {...defaultProps} />);
    const select = screen.getByTestId("sort-select");

    fireEvent.change(select, { target: { value: SORT_OPTIONS.PRICE_DESC } });

    expect(mockSetSortOption).toHaveBeenCalledWith(SORT_OPTIONS.PRICE_DESC);
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("updates URL search params correctly when selection changes", () => {
    const mockParams = new URLSearchParams();
    mockSetSearchParams.mockImplementation((callback) => {
      const newParams = callback(mockParams);
      expect(newParams.get("sort")).toBe(SORT_OPTIONS.PRICE_ASC);
      expect(newParams.get("page")).toBe(FIRST_PAGE.toString());
    });

    render(<Sort {...defaultProps} />);
    const select = screen.getByTestId("sort-select");

    fireEvent.change(select, { target: { value: SORT_OPTIONS.PRICE_ASC } });
  });

  it("removes sort param when default option is selected", () => {
    const mockParams = new URLSearchParams("?sort=price_asc");
    mockSetSearchParams.mockImplementation((callback) => {
      const newParams = callback(mockParams);
      expect(newParams.has("sort")).toBe(false);
      expect(newParams.get("page")).toBe(FIRST_PAGE.toString());
    });

    render(<Sort {...defaultProps} sortOption={SORT_OPTIONS.PRICE_ASC} />);
    const select = screen.getByTestId("sort-select");

    fireEvent.change(select, { target: { value: "" } });
  });

  it("resets page to FIRST_PAGE when sort changes", () => {
    const mockParams = new URLSearchParams("?page=3");
    mockSetSearchParams.mockImplementation((callback) => {
      const newParams = callback(mockParams);
      expect(newParams.get("page")).toBe(FIRST_PAGE.toString());
    });

    render(<Sort {...defaultProps} />);
    const select = screen.getByTestId("sort-select");

    fireEvent.change(select, { target: { value: SORT_OPTIONS.NAME_ASC } });
  });
});
