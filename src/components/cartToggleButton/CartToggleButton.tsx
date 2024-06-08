import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { AdjustQuantityButton } from '../common/adjustQuantityButton/AdjustQuantityButton';
import useCartItems from '@/hooks/useCartItems';
import { useToast } from '@/hooks/useToast';

interface CartItemButtonProp {
  productId: number;
}

const CartToggleButton = ({ productId }: CartItemButtonProp) => {
  const { toastError } = useToast();
  const { cartItems, addCartItemMutation, matchCartItem } = useCartItems();

  return (
    <>
      {matchCartItem(productId) ? (
        <Styled.HandleCartItemButton $isInCart={true}>
          <AdjustQuantityButton productId={productId} />
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
