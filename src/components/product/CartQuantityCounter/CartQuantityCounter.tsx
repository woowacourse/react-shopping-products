import { CartItem, Product } from '@appTypes/product';
import * as Styled from './CartQuantityCounter.styled';
import { Minus, Plus } from '@assets/svg';
import useUpdateItemQuantity from '@hooks/cartItem/useUpdateItemQuantity';

interface CartQuantityCounterProps {
  cartItems: CartItem[];
  product: Product;
}

const CartQuantityCounter = ({ cartItems, product }: CartQuantityCounterProps) => {
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();

  const quantity = cartItems.find((item) => item.product.id === product.id)?.quantity ?? 1;
  const id = cartItems.find((item) => item.product.id === product.id)?.id;

  if (!id) return;

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
