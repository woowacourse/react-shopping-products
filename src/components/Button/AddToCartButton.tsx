import { PlusShoppingCartIcon } from "../../assets";
import * as S from "./AddToCartButton.styled";
import { BaseButton } from "./BaseButton";

export type AddToCartButtonProp = {
  onClick?: () => void;
};

export const AddToCartButton = ({ onClick }: AddToCartButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="상품 담기 버튼">
      <S.StyledContainer>
        <S.StyledAddImg src={PlusShoppingCartIcon} alt="" />
        <S.StyledTitle>담기</S.StyledTitle>
      </S.StyledContainer>
    </BaseButton>
  );
};
