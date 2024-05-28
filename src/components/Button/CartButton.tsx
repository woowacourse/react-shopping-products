import { ShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

export const CartButton = ({ onClick }: { onClick: () => void }) => {
  const countNumber = 0;

  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledCartButtonImg src={ShoppingCartIcon} />
        {countNumber && <StyledCartCount>{countNumber}</StyledCartCount>}
      </StyledContainer>
    </BaseButton>
  );
};
