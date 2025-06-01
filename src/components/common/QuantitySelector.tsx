import { css } from "@emotion/react";
import DecreaseSign from "../icons/DecreaseSign";
import IncreaseSign from "../icons/IncreaseSign";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) => {
  return (
    <div css={quantitySelectorStyle}>
      <button css={signButtonStyle} onClick={onDecrease}>
        <DecreaseSign />
      </button>
      <span>{quantity}</span>
      <button css={signButtonStyle} onClick={onIncrease}>
        <IncreaseSign />
      </button>
    </div>
  );
};

export default QuantitySelector;

const quantitySelectorStyle = css`
  display: flex;
  gap: 13px;
  align-items: center;
`;

const signButtonStyle = css`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
`;
