import * as Styled from './CartModal.styled';

import { CartItem } from '@appTypes/product';
import { CompoundModal } from 'le-sserafim';
import SelectedItem from '../CartIem/SelectedItem';
import { formatKoreanCurrency } from '@utils/currency';

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  deleteItem: (id: number) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
}

export default function CartModal({
  cartItems,
  onClose,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
}: CartModalProps) {
  const cartItemsAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  return (
    <CompoundModal
      position='bottom'
      size='free'
      style={{ padding: '24px 16px' }}
      onClose={onClose}
    >
      <Styled.Title>장바구니</Styled.Title>
      <Styled.SelectedItemsContainer>
        {cartItems.map(cartItem => (
          <SelectedItem
            key={cartItem.id}
            cartItem={cartItem}
            deleteItem={deleteItem}
            increaseItemQuantity={increaseItemQuantity}
            decreaseItemQuantity={decreaseItemQuantity}
          ></SelectedItem>
        ))}
      </Styled.SelectedItemsContainer>
      <Styled.AmountContainer>
        <Styled.AmountDescription>총 결제 금액</Styled.AmountDescription>
        <Styled.AmountCurrency>
          {formatKoreanCurrency(cartItemsAmount)}
        </Styled.AmountCurrency>
      </Styled.AmountContainer>

      <CompoundModal.buttonContainer>
        <CompoundModal.button buttonTheme='primary' onClick={onClose}>
          닫기
        </CompoundModal.button>
      </CompoundModal.buttonContainer>
    </CompoundModal>
  );
}
