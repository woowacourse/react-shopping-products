import { Modal } from "@cys4585/react-modal";
import CartList from "./CartList/CartList";

interface CartListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartListModal = ({ isOpen, onClose }: CartListModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} config={{ position: "bottom" }}>
        <Modal.Header
          hasCloseButton={true}
          title="장바구니"
          onClose={onClose}
        />
        <Modal.Content>
          <CartList />
        </Modal.Content>
        <Modal.Footer>
          <Modal.Footer.Button onClick={onClose}>닫기</Modal.Footer.Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartListModal;
