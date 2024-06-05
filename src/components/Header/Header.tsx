import Logo from "@assets/logo.svg";
import Cart from "@assets/cart.svg";
import * as H from "./Header.style";
import { useContext } from "react";
import { CartItemsContext } from "@context/CartItemsContext";

export default function Header({
  handleOpenCartModal,
}: {
  handleOpenCartModal: () => void;
}) {
  const { cartItems } = useContext(CartItemsContext);
  const quantityInCart = cartItems.length;

  return (
    <H.HeaderStyle>
      <H.LogoImg src={Logo} alt="로고" />
      <H.CartButton onClick={handleOpenCartModal}>
        <H.CartImg src={Cart} alt="장바구니" />
        {quantityInCart && <H.CartCount>{quantityInCart}</H.CartCount>}
      </H.CartButton>
    </H.HeaderStyle>
  );
}
