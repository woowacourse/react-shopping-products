import * as S from "./Header.styled";
import CartItemButton from "@components/CartItemButton";

function Header() {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <CartItemButton />
    </S.Header>
  );
}

export default Header;
