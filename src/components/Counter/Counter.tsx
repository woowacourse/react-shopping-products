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
        <Image src="assets/minus.svg" alt="수량 감소" />
      </button>
      <span data-testid={`product-quantity`} css={valueCss}>
        {value}
      </span>
      <button onClick={onIncrement}>
        <Image src="assets/plus.svg" alt="수량 증가" />
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
