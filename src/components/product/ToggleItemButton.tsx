import styled from "@emotion/styled";
import { useState } from "react";
import DeleteFromCart from "../icons/DeleteFromCart";
import AddToCart from "../icons/AddToCart";
import COLOR_PALETTE from "../../style/colorPalette";

const S = {
  ToggleItemButton: styled.button<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.lightGrey : COLOR_PALETTE.black)};
    color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.black : COLOR_PALETTE.white)};
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

const ToggleItemButton = ({ id }: { id: number }) => {
  //TODO: 상품의 장바구니 상태에 대한 정보를 받아온다.
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => setSelected((prev) => !prev);
  return (
    <S.ToggleItemButton key={id} onClick={handleClick} isSelected={isSelected}>
      {isSelected ? (
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
