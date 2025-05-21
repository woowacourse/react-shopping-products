import MinusIcon from "../../Icon/MinusIcon";
import PlusIcon from "../../Icon/PlusIcon";
import * as S from "./QuantityButton.styled";
function QuantityButton({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };
  return (
    <S.QuantityButtonContainer>
      <S.QuantityButton onClick={handleDecrease}>
        <MinusIcon />
      </S.QuantityButton>
      <S.QuantityButtonText>{quantity}</S.QuantityButtonText>
      <S.QuantityButton onClick={handleIncrease}>
        <PlusIcon />
      </S.QuantityButton>
    </S.QuantityButtonContainer>
  );
}

export default QuantityButton;
