import * as S from "./QuantitySelector.styles";
import PlusButton from "/plus.svg";
import MinusButton from "/minus.svg";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  increaseDisabled = false,
  decreaseDisabled = false,
}: Props) => {
  return (
    <S.QuantitySelector>
      <S.ButtonIcon
        src={MinusButton}
        alt="수량 감소"
        onClick={decreaseDisabled ? undefined : onDecrease}
        role="button"
        tabIndex={0}
        $disabled={decreaseDisabled}
      />
      {quantity}
      <S.ButtonIcon
        src={PlusButton}
        alt="수량 증가"
        onClick={increaseDisabled ? undefined : onIncrease}
        role="button"
        tabIndex={0}
        $disabled={increaseDisabled}
      />
    </S.QuantitySelector>
  );
};

export default QuantitySelector;
