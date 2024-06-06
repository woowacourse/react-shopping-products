import { BaseButton } from "./BaseButton";
import { StyledShopButton } from "./ShopButton.styled";

export const ShopButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledShopButton>SHOP</StyledShopButton>
    </BaseButton>
  );
};
