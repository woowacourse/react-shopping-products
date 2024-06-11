import { Modal } from "ryan-modal";
import CartModalContent from "./CartModalContent";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Dimmer />
      <Modal.Content style={cartModalContentStyle} position="bottom">
        <CartModalContent />
        <Modal.Button fullWidth onClick={onClose}>
          닫기
        </Modal.Button>
      </Modal.Content>
    </Modal>
  );
};

export default CartModal;

const cartModalContentStyle = {
  padding: "2.4rem 1.6rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
};
