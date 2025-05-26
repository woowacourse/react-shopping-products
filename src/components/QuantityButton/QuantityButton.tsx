import * as S from './QuantityButton.styled';

function QuantityButton({
  quantity,
  handleAddQuantity,
  handleSubtractQuantity,
}: {
  quantity: number;
  handleAddQuantity: () => void;
  handleSubtractQuantity: () => void;
}) {
  return (
    <S.QuantityContainer>
      <S.QuantityButton onClick={handleSubtractQuantity}>-</S.QuantityButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.QuantityButton onClick={handleAddQuantity}>+</S.QuantityButton>
    </S.QuantityContainer>
  );
}

export default QuantityButton;
