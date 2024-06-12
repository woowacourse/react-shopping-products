import { BaseButton } from "./BaseButton";
import * as S from "./ShopButton.styled";

export type ShopButtonProp = {
  onClick?: () => void;
};

export const ShopButton = ({ onClick }: ShopButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="홈 버튼">
      <S.StyledShopButton>SHOP</S.StyledShopButton>
    </BaseButton>
  );
};
