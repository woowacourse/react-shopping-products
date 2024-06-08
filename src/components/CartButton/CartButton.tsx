import React, { useState } from 'react';

import { QuantityUpdateButton } from '../index';
import { useFetchProductQuantity } from '../../hooks';

import { AddCartIcon } from '../../assets';
import * as S from './CartButton.styled';
import { Carts } from '../../types/fetch';

interface CartButtonProps {
  cartItem: Carts | null;
  onAddClick: (event: React.MouseEvent) => void;
}
function CartButton({ cartItem, onAddClick }: CartButtonProps) {
  const [isExistInCart, setIsExistInCart] = useState(
    cartItem && cartItem.quantity > 0 ? true : false,
  );

  const handleAddClick = (event: React.MouseEvent) => {
    onAddClick(event);
    setIsExistInCart(true);
  };

  return cartItem && isExistInCart ? (
    <QuantityUpdateButton item={cartItem} />
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} alt="상품 담기" />
      담기
    </S.AddButton>
  );
}

export default CartButton;
