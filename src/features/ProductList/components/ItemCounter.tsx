import { IconButton } from '@/shared/components/IconButton';
import { useState } from 'react';

interface ItemCounterProps {
  initial?: number;
  onChange?: (value: number) => void;
  handleDeleteToCart: () => void;
}

const ItemCounter = ({ initial = 1, onChange, handleDeleteToCart }: ItemCounterProps) => {
  const [count, setCount] = useState(initial);

  const handleDecrement = () => {
    const newCount = count - 1;

    if (newCount < 1) {
      handleDeleteToCart();
      return;
    }

    setCount(newCount);
    onChange?.(newCount);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <IconButton
        src="/minus.svg"
        aria-label="감소"
        onClick={handleDecrement}
        variant="secondary"
      />
      <span style={{ minWidth: '24px', textAlign: 'center' }}>{count}</span>
      <IconButton src="/plus.svg" aria-label="증가" onClick={handleIncrement} variant="secondary" />
    </div>
  );
};

export default ItemCounter;
