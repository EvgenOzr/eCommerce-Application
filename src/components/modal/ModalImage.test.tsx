import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalImage from "./ModalImage";
import { ModalType } from "../../types/shopTypes";

describe("ModalImage Component", () => {
  const mockProps: ModalType = {
    closeModal: vi.fn(),
    selectedImage: "https://example.com/image.jpg",
    modalNext: vi.fn(),
    modalPrev: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls closeModal when overlay is clicked", () => {
    render(<ModalImage {...mockProps} />);

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it("does not call closeModal when content is clicked", () => {
    render(<ModalImage {...mockProps} />);

    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockProps.closeModal).not.toHaveBeenCalled();
  });

  it("calls closeModal when close button is clicked", () => {
    render(<ModalImage {...mockProps} />);

    fireEvent.click(screen.getByText("×"));
    expect(mockProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it("calls modalPrev when left button is clicked", () => {
    render(<ModalImage {...mockProps} />);

    fireEvent.click(screen.getByText("❮"));
    expect(mockProps.modalPrev).toHaveBeenCalledTimes(1);
    expect(mockProps.closeModal).not.toHaveBeenCalled();
  });

  it("calls modalNext when right button is clicked", () => {
    render(<ModalImage {...mockProps} />);

    fireEvent.click(screen.getByText("❯"));
    expect(mockProps.modalNext).toHaveBeenCalledTimes(1);
    expect(mockProps.closeModal).not.toHaveBeenCalled();
  });

  it("applies correct CSS classes", () => {
    render(<ModalImage {...mockProps} />);

    expect(screen.getByTestId("modal-overlay")).toHaveClass("modal_overlay");
    expect(screen.getByTestId("modal-content")).toHaveClass(
      "modal_overlay_content"
    );
    expect(screen.getByRole("img")).toHaveClass("modal_overlay_content_image");
    expect(screen.getByText("❮")).toHaveClass(
      "item-container_images_slider_buttons",
      "left_button"
    );
    expect(screen.getByText("❯")).toHaveClass(
      "item-container_images_slider_buttons",
      "right_button"
    );
  });
});
