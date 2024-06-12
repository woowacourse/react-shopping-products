import { PlusShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledActionImg, StyledActionTitle, StyledContainer } from "./CartActionButton.styled";

export type CartActionButtonProp = {
  onClick?: () => void;
};

export const CartActionButton = ({ onClick }: CartActionButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="상품 담기 버튼">
      <StyledContainer>
        <StyledActionImg src={PlusShoppingCartIcon} alt="" />
        <StyledActionTitle>담기</StyledActionTitle>
      </StyledContainer>
    </BaseButton>
  );
};
