import { css } from '@emotion/react';
import Image from '../Image/Image';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Counter({ value, onIncrement, onDecrement }: CounterProps) {
  return (
    <div css={counterWrapper}>
      <button onClick={onDecrement}>
        <Image src="assets/minus.svg" />
      </button>
      <span css={valueCss}>{value}</span>
      <button onClick={onIncrement}>
        <Image src="assets/plus.svg" />
      </button>
    </div>
  );
}

const counterWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
});

const valueCss = css({
  fontSize: '12px',
  fontWeight: 500
});
