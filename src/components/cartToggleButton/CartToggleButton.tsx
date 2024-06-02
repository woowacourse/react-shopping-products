import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { CartItemInfo } from '@/types/cartItem';

interface CartItemButtonProp {
  productId: number;
  matchedCartItem: CartItemInfo | undefined;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

const CartToggleButton = ({
  productId,
  matchedCartItem,
  handleAddCartItem,
  handleDeleteCartItem,
}: CartItemButtonProp) => {
  if (matchedCartItem) {
    return (
      <Styled.HandleCartItemButton $isInCart={true} onClick={() => handleDeleteCartItem(productId)}>
        <img src={IMAGES.REMOVE_SHOPPING_CART} alt="장바구니에서 삭제버튼" />
        빼기
      </Styled.HandleCartItemButton>
    );
  }

  return (
    <Styled.HandleCartItemButton $isInCart={false} onClick={() => handleAddCartItem(productId)}>
      <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
      담기
    </Styled.HandleCartItemButton>
  );
};

export default CartToggleButton;
