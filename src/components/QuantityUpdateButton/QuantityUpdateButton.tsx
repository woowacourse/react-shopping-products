import { Carts } from '../../types/fetch';
import { useFetchUpdateQuantity } from '../../hooks';

import * as S from './QuantityUpdateButton.styled';

interface QuantityUpdateButtonProps {
  item: Carts;
}

function QuantityUpdateButton({ item }: QuantityUpdateButtonProps) {
  const { updateCartItemQuantity } = useFetchUpdateQuantity();
  if (!item) return;

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
