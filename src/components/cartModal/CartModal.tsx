import { useModalClose } from "../../hooks/useModalClose/useModalClose";
import CartItem from "../cartItem/CartItem";
import {
  CloseButton,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from "./CartModal.css";

interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  const { onClickOverlay } = useModalClose({ closeModal: onClose });

  return (
    <>
      <div id="modal-overlay" css={ModalOverlay} onClick={onClickOverlay} />
      <div css={ModalContainer}>
        <h2 css={ModalTitle}>장바구니</h2>
        <hr />
        <CartItem />
        <CartItem />
        <button css={CloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}

export default Modal;
