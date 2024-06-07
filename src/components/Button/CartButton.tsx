import { ShoppingCartIcon } from "../../assets";
import { useCart } from "../../context/cartContext";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  onClick?: () => void;
}

export const CartButton = ({ onClick = () => {} }: CartButtonProps) => {
  const { cartItems } = useCart();

  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledCartButtonImg src={ShoppingCartIcon} alt="" />
        <StyledCartCount>{cartItems.length}</StyledCartCount>
      </StyledContainer>
    </BaseButton>
  );
};
