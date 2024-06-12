import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';
import * as S from './QuantityStepper.style';

interface QuantityStepperProps {
  quantity: number;
  onMinusButtonClick: () => void;
  onPlusButtonClick: () => void;
}

function QuantityStepper({ quantity, onMinusButtonClick, onPlusButtonClick }: QuantityStepperProps) {
  return (
    <S.Layout>
      <S.QuantityButton onClick={onMinusButtonClick}>
        <img src={MinusIcon} alt="수량 감소" />
      </S.QuantityButton>
      <p>{quantity}</p>
      <S.QuantityButton onClick={onPlusButtonClick}>
        <img src={PlusIcon} alt="수량 증가" />
      </S.QuantityButton>
    </S.Layout>
  );
}
export default QuantityStepper;
