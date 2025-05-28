import { css } from "@emotion/css";
import Button from "../Button";

interface StepperProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  disabled?: boolean;
}

const Stepper = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  disabled = false,
}: StepperProps) => {
  return (
    <div className={StepperStyles}>
      <Button title="-" onClick={onDecreaseQuantity} disabled={disabled} />
      <div data-testid="stepper-quantity">{quantity}</div>
      <Button title="+" onClick={onIncreaseQuantity} disabled={disabled} />
    </div>
  );
};

const StepperStyles = css`
  display: flex;
  border-radius: 8px;
  gap: 8px;
  border: none;
  cursor: pointer;
`;

export default Stepper;
