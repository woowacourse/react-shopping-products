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
      <S.Button
        onClick={onDecrease}
        data-testid="decrease-button"
        role="button"
        aria-label="빼기"
      >
        <S.Icon src={minusIcon} alt="Decrease" />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={onIncrease} role="button" aria-label="더하기">
        <S.Icon src={plusIcon} alt="Increase" />
      </S.Button>
    </S.Container>
  );
}

export default QuantityCounter;
