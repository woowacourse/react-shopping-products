import * as S from './QuantityButton.styled';
import { useState } from 'react';

function QuantityButton() {
  const [quantity, setQuantity] = useState<number>(1);
  const handleQuantityChange = (action: string) => {
    if (action === 'increment') {
      return setQuantity((prev) => prev + 1);
    }
    if (action === 'decrement') {
      return quantity > 0 ? setQuantity((prev) => prev - 1) : setQuantity(0);
    }
    return quantity;
  };

  return (
    <S.QuantityContainer>
      <S.QuantityButton onClick={() => handleQuantityChange('decrement')}>-</S.QuantityButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.QuantityButton onClick={() => handleQuantityChange('increment')}>+</S.QuantityButton>
    </S.QuantityContainer>
  );
}

export default QuantityButton;
