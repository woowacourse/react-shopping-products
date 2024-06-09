import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Carts } from '../../types/fetch';
import * as S from './QuantityUpdateButton.styled';

interface QuantityUpdateButtonProps {
  item: Carts;
}

function QuantityUpdateButton({ item }: QuantityUpdateButtonProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext가 비어있습니다.');
  }
  if (!item) return;

  const { updateCartItemQuantity } = cartContext;

  const handleIncreasedQuantity = (item: Carts) => {
    updateCartItemQuantity({ id: item.id, quantity: item.quantity + 1 });
  };

  const handleDecreasedQuantity = (item: Carts) => {
    updateCartItemQuantity({ id: item.id, quantity: item.quantity - 1 });
  };

  return (
    <S.CardQuantityButton>
      <S.QuantityUpdateButton onClick={() => handleDecreasedQuantity(item)}>
        -
      </S.QuantityUpdateButton>
      <p>{item.quantity}</p>
      <S.QuantityUpdateButton onClick={() => handleIncreasedQuantity(item)}>
        +
      </S.QuantityUpdateButton>
    </S.CardQuantityButton>
  );
}

export default QuantityUpdateButton;
