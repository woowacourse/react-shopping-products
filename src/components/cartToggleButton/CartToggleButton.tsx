import * as Styled from './CartToggleButton.styled';
import CountButtonContainer from '../countButtonContainer/CountButtonContainer';

import { IMAGES } from '@/assets';
import { Product } from '@/types/product';

import useCartItems from '@/hooks/useCartItems';

interface CartItemButtonProp {
  product: Product;
}

const CartToggleButton = ({ product }: CartItemButtonProp) => {
  const { matchCartItem, handleAddCartItem } = useCartItems();
  const matchedCartItem = matchCartItem(product.id);

  if (matchedCartItem) {
    return (
      <CountButtonContainer item={matchedCartItem} testId={`cart-toggle-button-${product.id}`} />
    );
  }

  return (
    <Styled.HandleCartItemButton $isInCart={false} onClick={() => handleAddCartItem(product)}>
      <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
      담기
    </Styled.HandleCartItemButton>
  );
};

export default CartToggleButton;
