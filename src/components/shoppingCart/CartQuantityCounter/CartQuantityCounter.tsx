import { CartItem } from '@appTypes/product';
import * as Styled from './CartQuantityCounter.styled';
import { Minus, Plus } from '@assets/svg';
import useUpdateItemQuantity from '@hooks/cartItem/useUpdateItemQuantity';

interface CartQuantityCounterProps {
  cartItem: CartItem;
}

const CartQuantityCounter = ({ cartItem: { quantity, id } }: CartQuantityCounterProps) => {
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();

  return (
    <Styled.CartQuantityCounterWrapper>
      <Styled.CounterButton
        onClick={() => {
          updateItemQuantity({ id, quantity: quantity - 1 });
        }}
      >
        <Minus />
      </Styled.CounterButton>
      <span>{quantity}</span>
      <Styled.CounterButton
        onClick={() => {
          updateItemQuantity({ id, quantity: quantity + 1 });
        }}
      >
        <Plus />
      </Styled.CounterButton>
    </Styled.CartQuantityCounterWrapper>
  );
};

export default CartQuantityCounter;
