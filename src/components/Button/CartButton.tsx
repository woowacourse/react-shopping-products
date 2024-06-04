import { ShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  quantity: number;
  onClick: () => void;
}

export const CartButton = ({ quantity, onClick }: CartButtonProps) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledCartButtonImg src={ShoppingCartIcon} />
        {quantity && <StyledCartCount>{quantity}</StyledCartCount>}
      </StyledContainer>
    </BaseButton>
  );
};
