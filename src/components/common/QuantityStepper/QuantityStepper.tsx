import Button from '../Button/Button';
import * as S from './QuantityStepper.style';
import PLUS from '../../../assets/plus.svg?react';
import MINUS from '../../../assets/minus.svg?react';

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
        isDisabled={quantity === 1}
        aria-label="minus"
      >
        <MINUS />
      </Button>
      <S.Quantity>{quantity}</S.Quantity>
      <Button
        size="s"
        onClick={increaseQuantity}
        square={true}
        aria-label="plus"
      >
        <PLUS />
      </Button>
    </S.QuantityStepper>
  );
};

export default QuantityStepper;
