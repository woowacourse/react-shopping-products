import { MinusShoppingCartIcon, PlusShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledActionImg, StyledActionTitle, StyledContainer } from "./CartActionButton.styled";

export type CartActionButtonType = {
  actionType: string;
  onClick?: () => void;
};

export const CartActionButton = ({ actionType, onClick }: CartActionButtonType) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledContainer actionType={actionType}>
        <StyledActionImg
          src={actionType === "add" ? PlusShoppingCartIcon : MinusShoppingCartIcon}
          alt=""
        />
        <StyledActionTitle actionType={actionType}>
          {actionType === "add" ? "담기" : "빼기"}
        </StyledActionTitle>
      </StyledContainer>
    </BaseButton>
  );
};
