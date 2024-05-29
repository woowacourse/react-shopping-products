import AddToCart from "../icons/AddToCart";
import COLOR_PALETTE from "../../style/colorPalette";
import DeleteFromCart from "../icons/DeleteFromCart";
import { HandleCartItems } from "../../hooks/useToggleCartItem";
import styled from "@emotion/styled";
import { useState } from "react";

const S = {
  ToggleItemButton: styled.button<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: ${({ isSelected }) =>
      isSelected ? COLOR_PALETTE.lightGrey : COLOR_PALETTE.black};
    color: ${({ isSelected }) =>
      isSelected ? COLOR_PALETTE.black : COLOR_PALETTE.white};
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    margin: 0 8px 8px 8px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
      opacity: 0.8;
    }
  `,
};

interface ToggleItemButtonProps {
  id: number;
  handleCartItems: HandleCartItems;
}

const ToggleItemButton = ({ id, handleCartItems }: ToggleItemButtonProps) => {
  //TODO: 이미 담긴 상태인지 아닌지 확인해줘야한다.
  const [isSelected, setSelected] = useState(false);
  const { addToCart, removeFromCart, isLoading } = handleCartItems;

  const handleClick = () => {
    setSelected((prev) => !prev);

    if (isSelected) {
      removeFromCart(id);
      return;
    }
    addToCart(id);
  };
  return (
    <S.ToggleItemButton key={id} onClick={handleClick} isSelected={isSelected}>
      {isLoading ? (
        <div>Loading...</div>
      ) : isSelected ? (
        <>
          <DeleteFromCart />
          빼기
        </>
      ) : (
        <>
          <AddToCart />
          담기
        </>
      )}
    </S.ToggleItemButton>
  );
};

export default ToggleItemButton;
