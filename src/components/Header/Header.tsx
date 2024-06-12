import { HTMLAttributes } from "react";
import { Wrapper, HeaderTitle } from "./Header.style";
import { ShopIconSVG, ShopIconWithNumberSVG } from "@/assets/svg";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  cartItemKind: number;
  handleOpenCart: () => void;
}

const Header = ({ handleOpenCart, cartItemKind, ...rest }: HeaderProps) => {
  return (
    <Wrapper {...rest}>
      <HeaderTitle>SHOP</HeaderTitle>
      {cartItemKind === 0 ? (
        <ShopIconSVG />
      ) : (
        <ShopIconWithNumberSVG num={cartItemKind} onClick={handleOpenCart} />
      )}
    </Wrapper>
  );
};

export default Header;
