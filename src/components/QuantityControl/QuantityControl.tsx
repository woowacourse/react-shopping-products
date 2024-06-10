import { CounterButton } from "../Button";
import {
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from "./QuantityControl.styled";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityControls = ({ quantity, onIncrement, onDecrement }: QuantityControlsProps) => {
  return (
    <StyledProductQuantityContainer>
      <CounterButton type="decrement" onClick={onDecrement} />
      <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
      <CounterButton type="increment" onClick={onIncrement} />
    </StyledProductQuantityContainer>
  );
};
