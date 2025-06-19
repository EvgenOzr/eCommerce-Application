import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Button component", () => {
  const defaultProps = {
    className: "",
    value: "Button",
    onClick: vi.fn(),
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Render without error", () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test("accepts classes via className", () => {
    const className = "test-class";
    render(<Button {...defaultProps} className={className} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(`cart-button button-${className}`);
  });

  test("displays the correct value", () => {
    const customValue = "Нажми меня";
    render(<Button {...defaultProps} value={customValue} />);
    expect(screen.getByText(customValue)).toBeInTheDocument();
  });

  test("is in disabled state", () => {
    render(<Button {...defaultProps} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
