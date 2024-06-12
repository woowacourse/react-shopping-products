import { CartButton, ShopButton } from "../Button";
import * as S from "./Header.styled";

export const Header = () => {
  return (
    <S.StyledHeader>
      <ShopButton onClick={() => {}} />
      <CartButton onClick={() => {}} />
    </S.StyledHeader>
  );
};
