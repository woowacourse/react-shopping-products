import { Modal } from "ryan-modal";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Dimmer />
      <Modal.Content style={{ padding: "2.4rem 1.6rem" }} position="bottom">
        <Modal.Button fullWidth>닫기</Modal.Button>
      </Modal.Content>
    </Modal>
  );
};

export default CartModal;
