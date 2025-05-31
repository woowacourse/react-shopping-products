import TrashIcon from '../Icon/TrashIcon';
import * as S from './QuantityButton.styled';

interface QuantityButtonProps {
  quantity: number;
  maxStock: number;
  handleAddQuantity: () => void;
  handleSubtractQuantity: () => void;
}

function QuantityButton({ quantity, maxStock, handleAddQuantity, handleSubtractQuantity }: QuantityButtonProps) {
  const isDisabled = maxStock ? quantity >= maxStock : false;

  return (
    <S.QuantityContainer>
      <S.QuantityButton onClick={handleSubtractQuantity}>{quantity === 1 ? <TrashIcon /> : '-'}</S.QuantityButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.QuantityButton isDisabled={isDisabled} onClick={handleAddQuantity} disabled={isDisabled}>
        +
      </S.QuantityButton>
    </S.QuantityContainer>
  );
}

export default QuantityButton;
