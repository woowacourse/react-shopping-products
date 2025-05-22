import * as S from "./QuantitySelector.styles";
import PlusButton from "/plus.svg";
import MinusButton from "/minus.svg";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease }: Props) => {
  return (
    <S.QuantitySelector>
      <S.ButtonIcon
        src={MinusButton}
        alt="수량 감소"
        onClick={onDecrease}
        role="button"
        tabIndex={0}
      />
      {quantity}
      <S.ButtonIcon
        src={PlusButton}
        alt="수량 증가"
        onClick={onIncrease}
        role="button"
        tabIndex={0}
      />
    </S.QuantitySelector>
  );
};

export default QuantitySelector;
