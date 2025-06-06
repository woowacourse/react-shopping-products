import { StepperButton, StepperContainer, StepperQuantity } from './Stepper.styles';

interface StepperProps {
  quantity: number;
  onIncrease: () => Promise<void>;
  onDecrease: () => Promise<void>;
  isLoading?: boolean;
}

function Stepper({ quantity, onIncrease, onDecrease, isLoading }: StepperProps) {
  return (
    <StepperContainer>
      <StepperButton onClick={onDecrease} disabled={isLoading}>
        −
      </StepperButton>
      <StepperQuantity>{quantity}</StepperQuantity>
      <StepperButton onClick={onIncrease} disabled={isLoading}>
        +
      </StepperButton>
    </StepperContainer>
  );
}

export default Stepper;
