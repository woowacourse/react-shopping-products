import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import * as H from "./Header.style";
import { useState } from "react";
import CartListModal from "../CartListModal/CartListModal";
import useCartItemsQuery from "../../hooks/useCartItemsQuery";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cartItems } = useCartItemsQuery();
  const quantityInCart = cartItems.length;

  return (
    <>
      <H.HeaderStyle>
        <H.LogoImg src={Logo} alt="로고" />
        <div onClick={() => setIsModalOpen(true)}>
          <H.CartImg src={Cart} alt="장바구니" />
          {quantityInCart && <H.CartCount>{quantityInCart}</H.CartCount>}
        </div>
      </H.HeaderStyle>

      <CartListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
