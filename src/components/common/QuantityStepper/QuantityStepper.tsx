import Button from '../Button/Button';
import * as S from './QuantityStepper.style';
import Plus from '../../../assets/images/Plus.svg?react';
import Minus from '../../../assets/images/Minus.svg?react';

export interface QuantityStepperProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const QuantityStepper = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: QuantityStepperProps) => {
  return (
    <S.QuantityStepper>
      <Button
        size="s"
        onClick={decreaseQuantity}
        square={true}
        aria-label="minus"
      >
        <Minus />
      </Button>
      <S.Quantity>{quantity}</S.Quantity>
      <Button
        size="s"
        onClick={increaseQuantity}
        square={true}
        aria-label="plus"
      >
        <Plus />
      </Button>
    </S.QuantityStepper>
  );
};

export default QuantityStepper;
