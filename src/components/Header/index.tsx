import * as S from "./Header.styled";
import CartItemButton from "@components/CartItemButton";

interface HeaderProps {
  quantity: number;
  onClick?: () => void;
}

function Header({ quantity, onClick }: HeaderProps) {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <CartItemButton quantity={quantity} onClick={onClick} />
    </S.Header>
  );
}

export default Header;
