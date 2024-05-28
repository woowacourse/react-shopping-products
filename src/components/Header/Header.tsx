import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { HeaderStyle } from "./Header.style";

export default function Header() {
  return (
    <HeaderStyle>
      <img src={Logo} alt="로고" className="header_logo" />
      <img src={Cart} alt="장바구니" className="header_cart" />
    </HeaderStyle>
  );
}
