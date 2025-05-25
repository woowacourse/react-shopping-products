import { css } from '@emotion/css';

interface QuantitySpinnerProps {
  quantity: number;
  handleDelete: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const QuantitySpinner = ({
  quantity,
  handleDelete,
  handleIncrease,
  handleDecrease,
}: QuantitySpinnerProps) => {
  return (
    <div className={QuantitySpinnerStyles}>
      <button
        className={QuantitySpinnerButtonStyles}
        onClick={quantity === 1 ? handleDelete : handleDecrease}
      >
        -
      </button>
      <span>{quantity}</span>
      <button className={QuantitySpinnerButtonStyles} onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantitySpinner;

const QuantitySpinnerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  gap: 12px;
`;

const QuantitySpinnerButtonStyles = css`
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;
