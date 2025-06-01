import { css } from "@emotion/css";
import Button from "../Button";

interface StepperProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Stepper = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  disabled = false,
  isLoading = false,
}: StepperProps) => {
  return (
    <div className={StepperStyles}>
      <Button
        title="-"
        onClick={onDecreaseQuantity}
        disabled={disabled}
        isLoading={isLoading}
      />
      <div data-testid="stepper-quantity">{quantity}</div>
      <Button
        title="+"
        onClick={onIncreaseQuantity}
        disabled={disabled}
        isLoading={isLoading}
      />
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
