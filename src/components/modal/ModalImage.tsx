import { ModalType } from "../../types/shopTypes";
import "./ModalImage.scss";

export default function ModalImage({ closeModal, selectedImage }: ModalType) {
  return (
    <div className="modal_overlay" onClick={closeModal}>
      <div
        className="modal_overlay_content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close_button" onClick={closeModal}>
          &times;
        </span>
        <img
          src={selectedImage}
          alt="selected-image"
          className="modal_overlay_content_image"
        />
      </div>
    </div>
  );
}
