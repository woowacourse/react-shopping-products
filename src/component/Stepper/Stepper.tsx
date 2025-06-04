import { css } from '@emotion/react';

interface StepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function Stepper({ quantity, onIncrease, onDecrease }: StepperProps) {
  return (
    <div css={stepperLayout}>
      <div css={stepperButtonContainer}>
        <button css={stepperButton} onClick={onDecrease}>
          <img src="./minus-quantity.svg" alt="minus" />
        </button>
      </div>
      <span css={stepperTextBox}>{quantity}</span>

      <div css={stepperButtonContainer}>
        <button css={stepperButton} onClick={onIncrease}>
          <img css={stepperButton} src="./add-quantity.svg" alt="plus" onClick={onIncrease} />
        </button>
      </div>
    </div>
  );
}

const stepperLayout = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  height: 24px;
  gap: 4px;
`;

const stepperButtonContainer = css`
  width: 24px;
  height: 24px;
`;
const stepperButton = css`
  cursor: pointer;
`;
const stepperTextBox = css`
  padding: 0px 9px;
  text-align: center;
  color: #0a0d13;
  font-family: Noto Sans;
  font-size: 12px;
`;
