import Counter from "../common/Counter";

interface CartItemCounterProps {
  count: number;
  increaseCartItemQuantity: () => void;
  decreaseCartItemQuantity: () => void;
}

const MIN_CART_ITEM_COUNT = 0;
const MAX_CART_ITEM_COUNT = 99;

const CartItemCounter = ({
  count,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
}: CartItemCounterProps) => {
  return (
    <Counter
      count={count}
      onIncrease={increaseCartItemQuantity}
      onDecrease={decreaseCartItemQuantity}
      minCount={MIN_CART_ITEM_COUNT}
      maxCount={MAX_CART_ITEM_COUNT}
    />
  );
};

export default CartItemCounter;
