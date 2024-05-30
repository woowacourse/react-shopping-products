import React, { useState } from 'react';
import { AddCartIcon, DeleteCartIcon } from '../../assets';
import * as S from './AddCartButton.styled';

interface AddCartButtonProps {
  onAddClick: (event: React.MouseEvent) => void;
  onDeleteClick: (event: React.MouseEvent) => void;
}
function AddCartButton({ onAddClick, onDeleteClick }: AddCartButtonProps) {
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
      <img src={DeleteCartIcon} />
      빼기
    </S.DeleteButton>
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} />
      담기
    </S.AddButton>
  );
}

export default AddCartButton;
