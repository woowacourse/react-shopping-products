import { IconButton } from '@/shared/components/IconButton';
import { useState } from 'react';

interface ItemCounterProps {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const ItemCounter = ({ initial = 1, min = 1, max = 99, onChange }: ItemCounterProps) => {
  const [count, setCount] = useState(initial);

  const handleDecrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <IconButton
        src="/minus.svg"
        aria-label="감소"
        onClick={handleDecrement}
        disabled={count === min}
        variant="secondary"
      />
      <span style={{ minWidth: '24px', textAlign: 'center' }}>{count}</span>
      <IconButton
        src="/plus.svg"
        aria-label="증가"
        onClick={handleIncrement}
        disabled={count === max}
        variant="secondary"
      />
    </div>
  );
};

export default ItemCounter;
