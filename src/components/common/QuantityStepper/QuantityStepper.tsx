import Button from '../Button/Button';
import { Plus, Minus } from '../../../assets';

import * as S from './QuantityStepper.style';

export interface QuantityStepperProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

function QuantityStepper({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: QuantityStepperProps) {
  return (
    <S.QuantityStepper>
      <Button size="s" onClick={decreaseQuantity} square aria-label="minus">
        <Minus />
      </Button>
      <S.Quantity>{quantity}</S.Quantity>
      <Button size="s" onClick={increaseQuantity} square aria-label="plus">
        <Plus />
      </Button>
    </S.QuantityStepper>
  );
}

export default QuantityStepper;
