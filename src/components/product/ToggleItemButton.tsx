import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import COLOR_PALETTE from "../../style/colorPalette";

import useCustomContext from "../../hooks/useCustomContext";

import { ToggleCartItemContext } from "../ToggleCartItemProvider";

import AddToCart from "../icons/AddToCart";
import DeleteFromCart from "../icons/DeleteFromCart";
import LoadingDots from "../LoadingDots";

const S = {
  ToggleItemButton: styled.button<{ isSelected: boolean }>`
    width: 60px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.lightGrey : COLOR_PALETTE.black)};
    color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.black : COLOR_PALETTE.white)};
    padding: 8px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
      opacity: 0.8;
    }
  `,
};

interface ToggleItemButtonProps {
  id: number;
}

const ToggleItemButton = ({ id }: ToggleItemButtonProps) => {
  const { addToCart, removeFromCart, checkSelected } = useCustomContext(ToggleCartItemContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setSelected] = useState(() => checkSelected(id));

  useEffect(() => {
    setSelected(checkSelected(id));
  }, [checkSelected, id]);

  const handleAddToCart = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await addToCart(id);
      setSelected(true);
    } catch (error) {
      setSelected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await removeFromCart(id);
      setSelected(false);
    } catch (error) {
      setSelected(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ToggleItemButton key={id} onClick={isSelected ? handleRemoveFromCart : handleAddToCart} isSelected={isSelected}>
      {isLoading ? (
        <LoadingDots type={isSelected ? "black" : "white"} />
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
