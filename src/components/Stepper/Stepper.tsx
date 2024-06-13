import { MinusButton, PlusButton } from "../../assets";

import * as Styled from "./Stepper.style";

interface StepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function Stepper({ value, onIncrease, onDecrease }: StepperProps) {
  return (
    <Styled.StepperContainer>
      <Styled.StepperButton onClick={onDecrease}>
        <img
          src={MinusButton}
          alt="product-quantity-decrease-button"
        />
      </Styled.StepperButton>
      <Styled.StepperValue>{value}</Styled.StepperValue>
      <Styled.StepperButton onClick={onIncrease}>
        <img
          src={PlusButton}
          alt="product-quantity-increase-button"
        />
      </Styled.StepperButton>
    </Styled.StepperContainer>
  );
}
