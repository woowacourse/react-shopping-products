import * as S from "./Header.styled";
import CartItemButton from "@components/CartItemButton";

interface HeaderProps {
  quantity: number;
}

function Header({ quantity }: HeaderProps) {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <CartItemButton quantity={quantity} />
    </S.Header>
  );
}

export default Header;
