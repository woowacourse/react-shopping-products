import React from 'react';

import { QuantityUpdateButton } from '../index';
import { Carts } from '../../types/fetch';

import { AddCartIcon } from '../../assets';
import * as S from './CartButton.styled';

interface CartButtonProps {
  cartItem: Carts | null;
  onAddClick: (event: React.MouseEvent) => void;
}
function CartButton({ cartItem, onAddClick }: CartButtonProps) {
  const handleAddClick = (event: React.MouseEvent) => {
    onAddClick(event);
  };

  return cartItem && cartItem.quantity > 0 ? (
    <QuantityUpdateButton item={cartItem} />
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} alt="상품 담기" />
      담기
    </S.AddButton>
  );
}

export default CartButton;
