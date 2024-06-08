import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { CartItemQuantity } from '../common/adjustQuantityButton/AdjustQuantityButton';
import useCartItems from '@/hooks/useCartItems';
import { useToast } from '@/hooks/useToast';

interface CartItemButtonProp {
  productId: number;
}

const CartToggleButton = ({ productId }: CartItemButtonProp) => {
  const { toastError } = useToast();
  const { cartItems, addCartItemMutation, adjustCartItemQuantityMutation, matchCartItem } =
    useCartItems();
  const cartItemQuantity = matchCartItem(productId)?.quantity;
  const cartItemId = matchCartItem(productId)?.id;

  const handleAdjustQuantity = (quantity: number) => {
    if (!cartItemId) return;
    adjustCartItemQuantityMutation({
      cartItemId: cartItemId,
      quantity: quantity,
    });
  };

  return (
    <>
      {matchCartItem(productId) ? (
        <Styled.HandleCartItemButton $isInCart={true}>
          <CartItemQuantity
            handlePlusButton={() => {
              cartItemQuantity && handleAdjustQuantity(cartItemQuantity + 1);
            }}
            handleMinusButton={() => cartItemQuantity && handleAdjustQuantity(cartItemQuantity - 1)}
          >
            {cartItemQuantity}
          </CartItemQuantity>
        </Styled.HandleCartItemButton>
      ) : (
        <Styled.HandleCartItemButton
          $isInCart={false}
          onClick={() => {
            if (!cartItems) return;
            if (cartItems?.length >= 20) {
              toastError('장바구니에 더 이상 추가할 수 없습니다.');
              return;
            }
            addCartItemMutation(productId);
          }}
        >
          <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
          담기
        </Styled.HandleCartItemButton>
      )}
    </>
  );
};

export default CartToggleButton;
