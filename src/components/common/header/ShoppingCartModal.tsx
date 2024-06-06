import { Modal } from 'maru-nice-modal';

import Receipt from '../receipt/Receipt';

import CartItem from '@/components/cartItem/CartItem';
import { CartItemInfo } from '@/types/cartItem';

interface ShoppingCartModalProp {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemInfo[];
}

const ShoppingCartModal = ({ isOpen, onClose, cartItems }: ShoppingCartModalProp) => {
  const totalAmount = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

  return (
    <Modal isOpen={isOpen} position="bottom" animationDuration={300} isAnimation>
      <Modal.Dimmed onDimmedClick={onClose} />
      <Modal.Header>
        <Modal.Title title="장바구니" />
      </Modal.Header>
      <Modal.Content style={{ marginBottom: 0 }}>
        <ul style={{ height: 220, overflow: 'scroll' }}>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </ul>
        <Receipt title="총 결제금액" price={totalAmount} />
      </Modal.Content>
      <Modal.ConfirmButton
        label="닫기"
        onConfirm={onClose}
        style={{ height: 40, borderRadius: 8 }}
      />
    </Modal>
  );
};

export default ShoppingCartModal;
