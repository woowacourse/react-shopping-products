import { HTMLAttributes } from "react";
import { Wrapper } from "./Header.style";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = ({ ...rest }: HeaderProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default Header;
