import { Modal, useModalState } from 'lv2-modal-component';
import useFetchCart from '../../hooks/useFetchCart';
import CartItemCard from './CartItemCard';
import * as S from './CartModal.styled';

interface CartModalProps {
  cartState: ReturnType<typeof useFetchCart>;
  modalState: ReturnType<typeof useModalState>;
}

const CartModal = ({ cartState, modalState }: CartModalProps) => {
  const { isOpen, closeModal } = modalState;
  const { cartItems } = cartState;

  const priceString = (cartItems ? cartItems.reduce((prev, item) => prev + item.quantity * item.product.price, 0) : 0).toLocaleString() + '원';
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.Positioner position={'bottom'} style={{ width: '100%' }}>
        <Modal.Header title={'장바구니'} onClose={() => {}} />
        <Modal.Content>
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', overflow: 'auto', maxHeight: '500px', paddingRight: '16px' }}>
            {cartState.cartItems &&
              cartState.cartItems.map((item) => <CartItemCard cartItem={item} style={{ paddingTop: '8px', borderTop: '1px solid #0000001a' }} />)}
          </div>
          <S.TotalPrice>
            <S.TotalPrice.Label>총 결제 금액</S.TotalPrice.Label>
            <S.TotalPrice.Value>{priceString}</S.TotalPrice.Value>
          </S.TotalPrice>
        </Modal.Content>
        <Modal.Footer
          style={{ height: '44px' }}
          confirmLabel={'닫기'}
          onConfirm={() => {
            closeModal();
          }}
        />
      </Modal.Positioner>
    </Modal>
  );
};

export default CartModal;
