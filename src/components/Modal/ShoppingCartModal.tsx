import { Modal } from "ollie-modal-components";
import CartItemList from "./CartItemList";
import PriceInfo from "./PriceInfo";

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCartModal = ({ isOpen, onClose }: ShoppingCartModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      style={{ borderRadius: "0.8rem 0.8rem 0 0", height: "55%" }}
    >
      <Modal.ModalHeader
        style={{
          margin: "1.2rem 3.2rem",
          paddingTop: "1.2rem",
          alignItems: "center",
        }}
      >
        <Modal.ModalTitle style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          장바구니
        </Modal.ModalTitle>
      </Modal.ModalHeader>
      <Modal.ModalContent style={{ margin: "0 3.2rem" }}>
        <CartItemList></CartItemList>
      </Modal.ModalContent>
      <Modal.ModalFooter
        style={{ flexDirection: "column", margin: "0.5rem 3.2rem" }}
      >
        <PriceInfo />
        <Modal.ModalButton
          size="L"
          onClick={() => console.log("dd")}
          style={{
            width: "97%",
            borderRadius: "5px",
            padding: "1.1rem 6.2rem",
            cursor: "pointer",
          }}
        >
          닫기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default ShoppingCartModal;
