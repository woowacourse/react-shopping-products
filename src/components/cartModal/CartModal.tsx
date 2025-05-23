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
  return (
    <>
      <div css={ModalOverlay} />
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
