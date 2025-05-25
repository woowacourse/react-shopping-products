import { IconButton } from '@/shared/components/IconButton';
import { useEffect, useState } from 'react';

interface ItemCounterProps {
  initial?: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveFromCart: () => void;
}

const ItemCounter = ({
  initial = 1,
  isInCart,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}: ItemCounterProps) => {
  const [count, setCount] = useState(initial);
  const [hasBeenAdded, setHasBeenAdded] = useState(isInCart);

  useEffect(() => {
    setCount(initial);
    setHasBeenAdded(isInCart);
  }, [initial, isInCart]);

  const handleIncrement = async () => {
    if (!hasBeenAdded && count === 0) {
      try {
        await onAddToCart();
        setCount(1);
        setHasBeenAdded(true);
      } catch (error) {
        console.warn('장바구니 담기 실패:', error);
      }
    } else {
      const newCount = count + 1;
      try {
        await onIncreaseQuantity();
        setCount(newCount);
      } catch (error) {
        console.warn('수량 증가 실패:', error);
      }
    }
  };

  const handleDecrement = () => {
    const newCount = count - 1;

    if (newCount < 1) {
      setCount(0);
      onRemoveFromCart();
      return;
    }

    setCount(newCount);
    onDecreaseQuantity();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <IconButton
        src="/minus.svg"
        aria-label="감소"
        onClick={handleDecrement}
        variant="secondary"
        style={{ width: '25px', height: '25px' }}
      />
      <span data-testid="cart-quantity" style={{ minWidth: '24px', textAlign: 'center' }}>
        {count === 0 ? 1 : count}
      </span>
      <IconButton
        src="/plus.svg"
        aria-label="증가"
        onClick={handleIncrement}
        variant="secondary"
        style={{ width: '25px', height: '25px' }}
      />
    </div>
  );
};

export default ItemCounter;
