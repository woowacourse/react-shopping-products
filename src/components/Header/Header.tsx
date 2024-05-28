import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { HeaderStyle, CartCount } from "./Header.style";

interface HeaderProps {
  cartCount?: number;
}
export default function Header({ cartCount }: HeaderProps) {
  return (
    <HeaderStyle>
      <img src={Logo} alt="로고" className="header_logo" />
      <img src={Cart} alt="장바구니" className="header_cart" />
      {cartCount && <CartCount>{cartCount}</CartCount>}
    </HeaderStyle>
  );
}
