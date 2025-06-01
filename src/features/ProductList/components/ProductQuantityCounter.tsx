import { IconButton } from '@/shared/components/IconButton';
import { useEffect, useState } from 'react';
import minus from '../../../../public/minus.svg';
import plus from '../../../../public/plus.svg';

interface ProductQuantityCounterProps {
  initialQuantity?: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveFromCart: () => void;
}

const ProductQuantityCounter = ({
  initialQuantity = 1,
  isInCart,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}: ProductQuantityCounterProps) => {
  const [count, setCount] = useState(initialQuantity);
  const [hasBeenAdded, setHasBeenAdded] = useState(isInCart);

  useEffect(() => {
    setCount(initialQuantity);
    setHasBeenAdded(isInCart);
  }, [initialQuantity, isInCart]);

  const handleIncrement = async () => {
    if (!hasBeenAdded && count === 0) {
      await onAddToCart();
      setCount(1);
      setHasBeenAdded(true);
    } else {
      const newCount = count + 1;
      await onIncreaseQuantity();
      setCount(newCount);
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
        src={minus}
        aria-label="감소"
        onClick={handleDecrement}
        variant="secondary"
        style={{ width: '25px', height: '25px' }}
      />
      <span data-testid="cart-quantity" style={{ minWidth: '24px', textAlign: 'center' }}>
        {count === 0 ? 1 : count}
      </span>
      <IconButton
        src={plus}
        aria-label="증가"
        onClick={handleIncrement}
        variant="secondary"
        style={{ width: '25px', height: '25px' }}
      />
    </div>
  );
};

export default ProductQuantityCounter;
