import { PlusShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledActionImg, StyledActionTitle, StyledContainer } from "./CartActionButton.styled";

export type CartActionButtonType = {
  onClick?: () => void;
};

export const CartActionButton = ({ onClick }: CartActionButtonType) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledActionImg src={PlusShoppingCartIcon} alt="" />
        <StyledActionTitle>담기</StyledActionTitle>
      </StyledContainer>
    </BaseButton>
  );
};
