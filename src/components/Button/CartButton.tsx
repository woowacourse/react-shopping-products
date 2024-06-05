import { useEffect, useState } from "react";
import { getCartItems } from "../../api/cart";
import { ShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  onClick?: () => void;
}

export const CartButton = ({ onClick = () => {} }: CartButtonProps) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartItems = async () => {
    try {
      const cartItems = await getCartItems();
      setCartCount(cartItems.length);
    } catch (error) {
      console.error("Failed to fetch cart counts", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledCartButtonImg src={ShoppingCartIcon} alt="" />
        <StyledCartCount>{cartCount}</StyledCartCount>
      </StyledContainer>
    </BaseButton>
  );
};
