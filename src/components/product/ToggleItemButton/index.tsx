import { useEffect, useState } from "react";

import useCustomContext from "../../../hooks/useCustomContext";

import { ToggleCartItemContext } from "../../provider/ToggleCartItemProvider";

import AddToCart from "../../icons/AddToCart";
import LoadingDots from "../../common/LoadingDots";

import S from "./StyledComponent";
import ProductControls from "../../domain/ProductControls";

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
    <S.ToggleItemContainer>
      {isLoading ? (
        <LoadingDots type={isSelected ? "black" : "white"} />
      ) : isSelected ? (
        <ProductControls />
      ) : (
        <S.ToggleItemButton
          key={id}
          onClick={isSelected ? handleRemoveFromCart : handleAddToCart}
          isSelected={isSelected}
        >
          <AddToCart />
          담기
        </S.ToggleItemButton>
      )}
    </S.ToggleItemContainer>
  );
};

export default ToggleItemButton;
