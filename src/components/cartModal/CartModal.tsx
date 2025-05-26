import { useModalClose } from "../../hooks/useModalClose/useModalClose";
import CartItem from "../cartItem/CartItem";
import { useData } from "../dataProvider/DataProvider";
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
  const { data } = useData();

  return (
    <>
      <div id="modal-overlay" css={ModalOverlay} onClick={onClickOverlay} />
      <div css={ModalContainer}>
        <h2 css={ModalTitle}>장바구니</h2>
        <hr />
        {data.cart?.map((data) => (
          <CartItem {...data} />
        ))}
        <button css={CloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}

export default Modal;
