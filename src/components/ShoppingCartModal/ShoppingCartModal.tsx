import { Modal } from '@hanuuny/react-modal';
import CartItem from '../CartItem/CartItem';
import { Cart } from '../../types/Cart.type';

interface ShoppingCartModalProps {
  cartItems: Cart[];
  onDeleteCartItem: (productId: number) => void;
  onUpdateCartItemQuantity: (productId: number, quantity: number) => void;
  isOpen: boolean;
  close: () => void;
}

const ShoppingCartModal = ({
  cartItems,
  onDeleteCartItem,
  onUpdateCartItemQuantity,
  isOpen,
  close,
}: ShoppingCartModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close} position="bottom">
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} onRemoveItem={onDeleteCartItem} onUpdateQuantity={onUpdateCartItemQuantity} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button text="닫기" onClick={close} />
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCartModal;
