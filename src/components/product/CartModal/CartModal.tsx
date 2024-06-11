import * as Styled from './CartModal.styled';

import { CompoundModal } from 'le-sserafim';
import SelectedItem from '../CartIem/SelectedItem';
import { formatKoreanCurrency } from '@utils/currency';
import useCartItems from '@hooks/query/useCartItem';
import useChangeCartItemQuantity from '@hooks/mutation/useChangeCartItemQuantity';
import useDeleteFromCart from '@hooks/mutation/useDeleteFromCart';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cartItems = [] } = useCartItems();

  const { mutate: deleteItem } = useDeleteFromCart();
  const { mutate: changeCartItemQuantity } = useChangeCartItemQuantity();

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
        {cartItems.length > 0 &&
          cartItems.map(cartItem => (
            <SelectedItem
              key={cartItem.id}
              cartItem={cartItem}
              deleteItem={deleteItem}
              increaseItemQuantity={() => {
                changeCartItemQuantity({
                  cartItemId: cartItem.id,
                  quantity: cartItem.quantity + 1,
                });
              }}
              decreaseItemQuantity={() => {
                changeCartItemQuantity({
                  cartItemId: cartItem.id,
                  quantity: Math.max(0, cartItem.quantity - 1),
                });
              }}
            />
          ))}

        {cartItems.length === 0 && (
          <Styled.EmptyFallback>
            장바구니에 담긴 상품이 없습니다.
          </Styled.EmptyFallback>
        )}
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
