import { css } from "@emotion/css";
import Button from "../Button";

interface ProductStepperProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  disabled?: boolean;
}

const ProductStepper = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  disabled = false,
}: ProductStepperProps) => {
  return (
    <div className={ProductStepperStyles}>
      <Button title="-" onClick={onDecreaseQuantity} disabled={disabled} />
      <div data-testid="stepper-qunatity">{quantity}</div>
      <Button title="+" onClick={onIncreaseQuantity} disabled={disabled} />
    </div>
  );
};

const ProductStepperStyles = css`
  display: flex;
  border-radius: 8px;
  gap: 8px;
  border: none;
  cursor: pointer;
`;

export default ProductStepper;
