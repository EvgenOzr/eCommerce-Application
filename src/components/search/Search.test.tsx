import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Search from "./Search";

describe("Search Component", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders correctly with default props", () => {
    render(<Search onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
    expect(screen.getByTestId("search-glass")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  it("calls onSearch callback when input changes", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "shoes" } });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("shoes");

    fireEvent.change(inputElement, { target: { value: "dresses" } });
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
    expect(mockOnSearch).toHaveBeenCalledWith("dresses");
  });

  it("maintains proper input attributes", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search");

    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveClass("header_active-search__text");
  });
});
