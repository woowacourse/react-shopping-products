import { Modal } from 'nakta-react-payments-components';
import CartItems from '../CartItems';

interface CartItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartItemModal = ({ isOpen, onClose }: CartItemModalProps) => {
  return (
    <Modal position="bottom" isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content size="medium">
        <Modal.Header>
          <Modal.Title>장바구니</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Main>
          <CartItems />
        </Modal.Main>
        <Modal.Footer align="column">
          <Modal.Button backgroundColor="primary" onClick={onClose} size="full">
            닫기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CartItemModal;
