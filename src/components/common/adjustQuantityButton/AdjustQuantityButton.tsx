import { CartItemInfo } from '@/types/cartItem';
import * as Styled from './AdjustQuantityButton.styled';
import { IMAGES } from '@/assets';

interface AdjustQuantityButtonProp {
  productId: number;
  matchCartItem: (productId: number) => CartItemInfo | undefined;
  handleAdjustQuantity: (quantity: number, cartItemId: number) => void;
}

export const AdjustQuantityButton = ({
  productId,
  matchCartItem,
  handleAdjustQuantity,
}: AdjustQuantityButtonProp) => {
  const cartItemQuantity = matchCartItem(productId)?.quantity ?? 0;
  const cartItemId = matchCartItem(productId)?.id ?? 0;

  return (
    <>
      <Styled.Button
        onClick={() => {
          handleAdjustQuantity(cartItemQuantity - 1, cartItemId);
        }}
      >
        <img src={IMAGES.MINUS_BUTTON} alt="-"></img>
      </Styled.Button>
      {cartItemQuantity}
      <Styled.Button
        onClick={() => {
          handleAdjustQuantity(cartItemQuantity + 1, cartItemId);
        }}
      >
        <img src={IMAGES.PLUS_BUTTON} alt="+"></img>
      </Styled.Button>
    </>
  );
};
