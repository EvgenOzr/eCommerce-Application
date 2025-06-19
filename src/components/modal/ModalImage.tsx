import { ModalType } from "../../types/shopTypes";
import "./ModalImage.scss";

export default function ModalImage({
  closeModal,
  selectedImage,
  modalNext,
  modalPrev,
}: ModalType) {
  return (
    <div
      className="modal_overlay"
      onClick={closeModal}
      data-testid="modal-overlay"
    >
      <div
        className="modal_overlay_content"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <span className="close_button" onClick={closeModal}>
          &times;
        </span>
        <button
          onClick={() => modalPrev()}
          className="item-container_images_slider_buttons left_button"
        >
          &#10094;
        </button>
        <img
          src={selectedImage}
          alt="selected-image"
          className="modal_overlay_content_image"
        />
        <button
          onClick={() => modalNext()}
          className="item-container_images_slider_buttons right_button"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
