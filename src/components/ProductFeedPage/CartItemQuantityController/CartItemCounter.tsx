import Counter from "@components/common/Counter";

interface CartItemCounterProps {
  count: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  minCount?: number;
  maxCount?: number;
}

const MIN_CART_ITEM_COUNT = 0;
const MAX_CART_ITEM_COUNT = 99;

const CartItemCounter = ({
  count,
  increaseQuantity,
  decreaseQuantity,
  minCount = MIN_CART_ITEM_COUNT,
  maxCount = MAX_CART_ITEM_COUNT,
}: CartItemCounterProps) => {
  return (
    <Counter
      count={count}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      minCount={minCount}
      maxCount={maxCount}
    />
  );
};

export default CartItemCounter;
