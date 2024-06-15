import React from 'react';
import { AddCartIcon } from '../../../../assets';
import * as S from './AddCartButton.styled';

interface AddCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
function AddCartButton({ onClick }: AddCartButtonProps) {
  return (
    <S.AddButton onClick={onClick}>
      <img src={AddCartIcon} alt="상품담기버튼" />
      담기
    </S.AddButton>
  );
}

export default AddCartButton;
