import { Modal } from 'cookie-nice-modal';
import style from './style.module.css';
import useLoadCartItems from '@queries/cart/useLoadCartItems';
import EachCartItem from './EachCartItem';

interface CartItemModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

function CartItemModal({ isOpen, onToggle }: CartItemModalProps) {
  const { cartItems } = useLoadCartItems();

  return (
    <Modal open={isOpen} onClose={onToggle} type="drawer" closeOnESCKeydown>
      <Modal.Header title="장바구니" onClose={onToggle} />
      <Modal.Content>
        <section className={style.container}>
          {cartItems?.map((cartItem) => <EachCartItem key={cartItem.id} cartItem={cartItem} />)}
          <hr className={style.hr} />
          <div className={style.totalPrice}>
            <p className={style.label}>총 결제 금액</p>
            <p className={style.amount}>95,000원</p>
          </div>
        </section>
      </Modal.Content>
      <Modal.Footer
        confirmButton={{ role: 'confirm', hide: true }}
        closeButton={{
          role: 'close',
          text: '닫기',
          onClick: onToggle,
          style: { backgroundColor: '#333333', border: 'none', color: 'white' },
        }}
      />
    </Modal>
  );
}

export default CartItemModal;
