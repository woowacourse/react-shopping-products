import { Modal } from '@jinyyy/simple-modal';

import { formatKoreanCurrency } from '@utils/currency';
import useShoppingCart from '@queries/shoppingCart/useShoppingCart';

import * as Styled from './ShoppingCartConfirmBottomSheet.styled';
import CartList from '@components/shoppingCart/CartList/CartList';

interface ShoppingCartConfirmBottomSheetProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ShoppingCartConfirmBottomSheet = ({
  isOpen,
  onToggle,
}: ShoppingCartConfirmBottomSheetProps) => {
  const { cartItems } = useShoppingCart();

  const totalPrice = cartItems.reduce(
    (prevTotalPrice, cartItem) => prevTotalPrice + cartItem.product.price * cartItem.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} onToggle={onToggle} position="bottom">
      <Modal.ModalHeader title="장바구니" />
      <Modal.ModalContent style={{ height: '444px', margin: '0px 0px 24px 0px' }}>
        <CartList cartItems={cartItems} />
        <Styled.PriceRow>
          <span>총 결제 금액</span>
          <span>{formatKoreanCurrency(totalPrice)}</span>
        </Styled.PriceRow>
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Modal.ModalButton color="primary" onClick={onToggle}>
          닫기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default ShoppingCartConfirmBottomSheet;
