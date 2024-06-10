import { Modal } from "choco-modal-component";
import { CartModalContent } from "../CartModalContent/CartModalContent";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      modalPosition="bottom"
      title="장바구니"
      closeButtonPosition="bottom"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {}}
      size="small"
      buttonText="닫기"
    >
      <CartModalContent />
    </Modal>
  );
};
