import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { HeaderStyle, CartCount, LogoImg, CartImg } from "./Header.style";
import { useContext, useEffect, useState } from "react";
import { CartItemsContext } from "../../context/CartItemsContext";

export default function Header() {
  const [quantityInCart, setQuantityInCart] = useState(0);
  const { cartItems } = useContext(CartItemsContext);

  useEffect(() => {
    setQuantityInCart(cartItems.length);
  }, [cartItems]);

  return (
    <HeaderStyle>
      <LogoImg src={Logo} alt="로고" />
      <CartImg src={Cart} alt="장바구니" />
      {quantityInCart && <CartCount>{quantityInCart}</CartCount>}
    </HeaderStyle>
  );
}
