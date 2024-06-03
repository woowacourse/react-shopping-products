import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import * as H from "./Header.style";
import { useCartItemsContext } from "../../hooks/useCartItemsContext";

export default function Header() {
  const { cartItems } = useCartItemsContext();
  const quantityInCart = cartItems.length;

  return (
    <H.HeaderStyle>
      <H.LogoImg src={Logo} alt="로고" />
      <H.CartImg src={Cart} alt="장바구니" />
      {quantityInCart && <H.CartCount>{quantityInCart}</H.CartCount>}
    </H.HeaderStyle>
  );
}
