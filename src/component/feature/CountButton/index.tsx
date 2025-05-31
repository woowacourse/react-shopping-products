import { useState, useEffect } from 'react';
import {
  countButtonButtonStyle,
  countButtonContainer,
} from './CountButton.styles';

interface CountButtonProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

const CountButton = ({ initialCount = 0, onCountChange }: CountButtonProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleCount = (type: 'plus' | 'minus') => {
    const newCount = type === 'plus' ? count + 1 : Math.max(0, count - 1);
    setCount(newCount);

    if (onCountChange) {
      onCountChange(newCount);
    }
  };

  return (
    <div css={countButtonContainer}>
      <button
        css={countButtonButtonStyle}
        onClick={() => handleCount('minus')}
        disabled={count === 0}
      >
        -
      </button>
      <span>{count}</span>
      <button css={countButtonButtonStyle} onClick={() => handleCount('plus')}>
        +
      </button>
    </div>
  );
};

export default CountButton;
