import { css } from "@emotion/css";
import StepperButton from "../Button/StepperButton";

interface ProductStepperProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

const ProductStepper = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductStepperProps) => {
  return (
    <div className={ProductStepperStyles}>
      <StepperButton title="-" onClick={onIncreaseQuantity} />
      <div>{quantity}</div>
      <StepperButton title="+" onClick={onDecreaseQuantity} />
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
