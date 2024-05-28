import { BaseButton } from "./BaseButton";
import { StyledActionImg, StyledActionTitle, StyledContainer } from "./CartActionButton.styled";
import { MinusShoppingCartIcon, PlusShoppingCartIcon } from "../../assets";

export type CartActionButtonType = {
  actionType: "add" | "abstract";
};

export const CartActionButton = ({ actionType }: CartActionButtonType) => {
  return (
    <BaseButton onClick={() => {}}>
      <StyledContainer actionType={actionType}>
        <StyledActionImg
          src={actionType === "add" ? PlusShoppingCartIcon : MinusShoppingCartIcon}
        />
        <StyledActionTitle actionType={actionType}>
          {actionType === "add" ? "담기" : "빼기"}
        </StyledActionTitle>
      </StyledContainer>
    </BaseButton>
  );
};
