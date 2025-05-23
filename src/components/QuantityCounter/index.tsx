import * as S from "./QuantityCounter.styled";
import plusIcon from "@/assets/icons/plus.png";
import minusIcon from "@/assets/icons/minus.png";

interface QuantityCounterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function QuantityCounter({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityCounterProps) {
  return (
    <S.Container>
      <S.Button onClick={onDecrease}>
        <S.Icon src={minusIcon} alt="Decrease" />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={onIncrease}>
        <S.Icon src={plusIcon} alt="Increase" />
      </S.Button>
    </S.Container>
  );
}

export default QuantityCounter;
