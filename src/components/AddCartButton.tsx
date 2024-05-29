import React, { useState } from 'react';
import * as S from './AddCartButton.styled';
function AddCartButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return isClicked ? (
    <S.DeleteButton onClick={handleClick}>빼기</S.DeleteButton>
  ) : (
    <S.AddButton onClick={handleClick}>담기</S.AddButton>
  );
}

export default AddCartButton;
