import { Modal } from '@hanuuny/react-modal';
import CartItem from '../CartItem/CartItem';
import { Cart } from '../../types/Cart.type';

interface ShoppingCartModalProps {
  cartItems: Cart[];
  isOpen: boolean;
  close: () => void;
}

const ShoppingCartModal = ({ cartItems, isOpen, close }: ShoppingCartModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close} position="bottom">
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} onRemoveItem={() => {}} onUpdateQuantity={() => {}} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button text="닫기" onClick={close} />
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCartModal;
