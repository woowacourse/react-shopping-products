import { CartItem } from '@appTypes/product';
import * as Styled from './CartQuantityCounter.styled';
import { Minus, Plus } from '@assets/svg';
import useUpdateItemQuantity from '@hooks/cartItem/useUpdateItemQuantity';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

interface CartQuantityCounterProps {
  cartItem: CartItem;
}

const CartQuantityCounter = ({ cartItem: { quantity, id } }: CartQuantityCounterProps) => {
  const showToast = useToastContext();

  const { mutate: updateItemQuantity } = useUpdateItemQuantity(showToast);

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
