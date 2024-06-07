import * as Styled from './CartToggleButton.styled';
import CountButtonContainer from '../countButtonContainer/CountButtonContainer';

import { IMAGES } from '@/assets';

import useCartItems from '@/hooks/useCartItems';

interface CartItemButtonProp {
  productId: number;
}

const CartToggleButton = ({ productId }: CartItemButtonProp) => {
  const { matchCartItem, handleAddCartItem } = useCartItems();
  const matchedCartItem = matchCartItem(productId);

  if (matchedCartItem) {
    return <CountButtonContainer item={matchedCartItem} />;
  }

  return (
    <Styled.HandleCartItemButton $isInCart={false} onClick={() => handleAddCartItem(productId)}>
      <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
      담기
    </Styled.HandleCartItemButton>
  );
};

export default CartToggleButton;
