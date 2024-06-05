import CartList from './CartList';
import CartPrice from './CartPrice';
import { Modal } from 'styled-base-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} position="bottom" onClose={onClose}>
      <Modal.Title>장바구니</Modal.Title>
      <Modal.Content>
        <CartList />
        <CartPrice />
      </Modal.Content>
      <Modal.CloseButton
        label="닫기"
        size="large"
        color="dark"
        onClose={onClose}
      />
    </Modal>
  );
};

export default CartModal;
