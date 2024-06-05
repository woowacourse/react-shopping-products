import { HTMLAttributes } from "react";
import { Wrapper, HeaderTitle } from "./Header.style";
import { ShopIconSVG, ShopIconWithNumberSVG } from "@/assets/svg";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ ...rest }: HeaderProps) => {
  return (
    <Wrapper {...rest}>
      <HeaderTitle>SHOP</HeaderTitle>
      <ShopIconSVG />
    </Wrapper>
  );
};

export default Header;
