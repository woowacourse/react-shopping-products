import React, { useContext, useEffect, useState } from 'react';

import { CartContext } from '../../CartContext';
import { AddCartIcon, DeleteCartIcon } from '../../assets';
import * as S from './AddCartButton.styled';

interface AddCartButtonProps {
  id: number;
  onAddClick: (event: React.MouseEvent) => void;
  onDeleteClick: (event: React.MouseEvent) => void;
}
function AddCartButton({ id, onAddClick, onDeleteClick }: AddCartButtonProps) {
  const { cartIdSet } = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(cartIdSet.has(id));
  }, [cartIdSet, id]);

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
      <img src={DeleteCartIcon} alt="상품빼기버튼" />
      빼기
    </S.DeleteButton>
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} alt="상품담기버튼" />
      담기
    </S.AddButton>
  );
}

export default AddCartButton;
