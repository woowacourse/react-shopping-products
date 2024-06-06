import { useEffect, useState } from "react";

import AddToCart from "../../icons/AddToCart";
import LoadingDots from "../../common/LoadingDots";

import S from "./StyledComponent";
import ProductControls from "../../domain/ProductControls";
import useFindCartItem from "../../../hooks/useFindCartItem";
import useToggleCartItem from "../../../hooks/useToggleCartItem";

interface ToggleItemButtonProps {
  productId: number;
}

const ToggleItemButton = ({ productId }: ToggleItemButtonProps) => {
  const { isLoading, addToCart, removeFromCart, checkSelected } = useToggleCartItem();
  const cartItem = useFindCartItem({ productId });
  const [isSelected, setSelected] = useState(() => checkSelected(productId));

  useEffect(() => {
    setSelected(checkSelected(productId));
  }, [checkSelected, productId]);

  const handleAddToCart = async () => {
    if (isLoading) return;
    addToCart(productId);
  };

  const handleRemoveFromCart = async () => {
    if (isLoading) return;
    removeFromCart(productId);
  };

  return (
    <S.ToggleItemContainer>
      {isLoading ? (
        <LoadingDots type={isSelected ? "black" : "white"} />
      ) : isSelected && cartItem ? (
        <ProductControls cartItem={cartItem} />
      ) : (
        <S.ToggleItemButton
          key={productId}
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
