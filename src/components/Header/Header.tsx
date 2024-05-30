import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { HeaderStyle, CartCount, LogoImg, CartImg } from "./Header.style";
import { useEffect, useState } from "react";
import { getCartItems } from "../../api";
import { useError } from "../../hooks/useError";

export default function Header() {
  const [quantityInCart, setQuantityInCart] = useState(0);
  const { showError } = useError();

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        const quantityInCart = await getCartItems();
        setQuantityInCart(quantityInCart.length);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      }
    };

    fetchCartItemsCount();
  }, [showError]);

  return (
    <HeaderStyle>
      <LogoImg src={Logo} alt="로고" />
      <CartImg src={Cart} alt="장바구니" />
      {quantityInCart && <CartCount>{quantityInCart}</CartCount>}
    </HeaderStyle>
  );
}
