import React, { useState } from 'react';

import { QuantityUpdateButton } from '../index';
import { Carts } from '../../types/fetch';

import { AddCartIcon } from '../../assets';
import * as S from './CartButton.styled';

interface CartButtonProps {
  item: Carts;
  onAddClick: (event: React.MouseEvent) => void;
}
function CartButton({ item, onAddClick }: CartButtonProps) {
  const [isExistInCart, setIsExistInCart] = useState(
    item && item.quantity > 0 ? true : false,
  );

  const handleAddClick = (event: React.MouseEvent) => {
    onAddClick(event);
    setIsExistInCart(true);
  };

  return isExistInCart ? (
    <QuantityUpdateButton item={item} />
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} alt="상품 담기" />
      담기
    </S.AddButton>
  );
}

export default CartButton;
