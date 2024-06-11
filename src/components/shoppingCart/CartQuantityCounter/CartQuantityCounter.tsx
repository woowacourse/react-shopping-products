import { CartItem } from '@appTypes/product';
import * as Styled from './CartQuantityCounter.styled';
import { Minus, Plus } from '@assets/svg';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import useUpdateItemQuantity from '@hooks/shoppingCart/useUpdateItemQuantity';

interface CartQuantityCounterProps {
  cartItem: CartItem;
}

const CartQuantityCounter = ({ cartItem: { quantity, id } }: CartQuantityCounterProps) => {
  const showToast = useToastContext();

  const { onDecreaseItemQuantity, onIncreaseItemQuantity } = useUpdateItemQuantity(showToast);

  return (
    <Styled.CartQuantityCounterWrapper>
      <Styled.CounterButton onClick={() => onDecreaseItemQuantity({ id, quantity })}>
        <Minus />
      </Styled.CounterButton>
      <span>{quantity}</span>
      <Styled.CounterButton onClick={() => onIncreaseItemQuantity({ id, quantity })}>
        <Plus />
      </Styled.CounterButton>
    </Styled.CartQuantityCounterWrapper>
  );
};

export default CartQuantityCounter;
