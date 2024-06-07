import { CartButton, ShopButton } from "../Button";
import { StyledHeader } from "./Header.styled";

export const Header = () => {
  return (
    <StyledHeader>
      <ShopButton onClick={() => {}} />
      <CartButton onClick={() => {}} />
    </StyledHeader>
  );
};
