import { PlusShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledAddImg, StyledTitle, StyledContainer } from "./AddToCartButton.styled";

export type AddToCartButtonProp = {
  onClick?: () => void;
};

export const AddToCartButton = ({ onClick }: AddToCartButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="상품 담기 버튼">
      <StyledContainer>
        <StyledAddImg src={PlusShoppingCartIcon} alt="" />
        <StyledTitle>담기</StyledTitle>
      </StyledContainer>
    </BaseButton>
  );
};
