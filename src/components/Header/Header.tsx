import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { HeaderStyle, CartCount } from "./Header.style";
import { useEffect, useState } from "react";
import { getCartItems } from "../../api";

export default function Header() {
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      const quantityInCart = await getCartItems();
      setQuantityInCart(quantityInCart.length);
    };

    fetchCartItemsCount();
  }, []);

  return (
    <HeaderStyle>
      <img src={Logo} alt="로고" className="header_logo" />
      <img src={Cart} alt="장바구니" className="header_cart" />
      {quantityInCart && <CartCount>{quantityInCart}</CartCount>}
    </HeaderStyle>
  );
}
