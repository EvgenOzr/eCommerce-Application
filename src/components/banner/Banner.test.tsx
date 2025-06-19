import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner Component", () => {
  const testProps = {
    textMain: "Main text",
    textAdd: "Additional text",
  };

  it("renders correctly", () => {
    render(<Banner {...testProps} />);

    expect(screen.getByText(testProps.textMain)).toBeInTheDocument();
    expect(screen.getByText(testProps.textAdd)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("closes when button clicked", () => {
    render(<Banner {...testProps} />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText(testProps.textMain)).not.toBeInTheDocument();
  });
});
