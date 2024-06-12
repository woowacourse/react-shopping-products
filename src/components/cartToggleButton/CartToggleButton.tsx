import * as Styled from './CartToggleButton.styled';
import CountButtonContainer from '../countButtonContainer/CountButtonContainer';

import { IMAGES } from '@/assets';
import useAddCartItemQuery from '@/hooks/queries/cartItems/useAddCartItemQuery';
import useFetchCartItemsQuery from '@/hooks/queries/cartItems/useFetchCartItemsQuery';
import { Product } from '@/types/product';

interface CartItemButtonProp {
  product: Product;
}

const CartToggleButton = ({ product }: CartItemButtonProp) => {
  const { data: cartItems, isSuccess } = useFetchCartItemsQuery();
  const { mutate: handleAddCartItem } = useAddCartItemQuery();

  if (isSuccess) {
    const matchedCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);

    if (matchedCartItem) {
      return (
        <CountButtonContainer
          cartItem={matchedCartItem}
          testId={`cart-toggle-button-${product.id}`}
        />
      );
    }
  }

  return (
    <Styled.HandleCartItemButton $isInCart={false} onClick={() => handleAddCartItem(product.id)}>
      <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
      담기
    </Styled.HandleCartItemButton>
  );
};

export default CartToggleButton;
