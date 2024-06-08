import * as Styled from './AdjustQuantityButton.styled';
import { IMAGES } from '@/assets';
import useCartItems from '@/hooks/useCartItems';

interface AdjustQuantityButtonProp {
  productId: number;
}

export const AdjustQuantityButton = ({ productId }: AdjustQuantityButtonProp) => {
  const { adjustCartItemQuantityMutation, matchCartItem } = useCartItems();

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
      <Styled.Button
        onClick={() => {
          cartItemQuantity && handleAdjustQuantity(cartItemQuantity - 1);
        }}
      >
        <img src={IMAGES.MINUS_BUTTON} alt="-"></img>
      </Styled.Button>
      {cartItemQuantity}
      <Styled.Button
        onClick={() => {
          cartItemQuantity && handleAdjustQuantity(cartItemQuantity + 1);
        }}
      >
        <img src={IMAGES.PLUS_BUTTON} alt="+"></img>
      </Styled.Button>
    </>
  );
};
