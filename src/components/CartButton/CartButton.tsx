import React, { useState } from 'react';

import { AddCartIcon, DeleteCartIcon } from '../../assets';
import * as S from './CartButton.styled';

interface CartButtonProps {
  id: number;
  onAddClick: (event: React.MouseEvent) => void;
  onDeleteClick: (event: React.MouseEvent) => void;
}
function CartButton({ id, onAddClick, onDeleteClick }: CartButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const handleDeleteClick = (event: React.MouseEvent) => {
    onDeleteClick(event);
    setIsClicked(false);
  };

  const handleAddClick = (event: React.MouseEvent) => {
    onAddClick(event);
    setIsClicked(true);
  };

  return isClicked ? (
    <S.DeleteButton onClick={handleDeleteClick}>
      <img src={DeleteCartIcon} alt="상품 빼기" />
      빼기
    </S.DeleteButton>
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} alt="상품 담기" />
      담기
    </S.AddButton>
  );
}

export default CartButton;
