import { BaseButton } from "./BaseButton";
import { StyledShopButton } from "./ShopButton.styled";

export type ShopButtonProp = {
  onClick?: () => void;
};

export const ShopButton = ({ onClick }: ShopButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="홈 버튼">
      <StyledShopButton>SHOP</StyledShopButton>
    </BaseButton>
  );
};
