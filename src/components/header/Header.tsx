import CartButton from "./CartButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

interface HeaderProps {
  cartItemAmount: number;
}

function Header({ cartItemAmount }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartButton cartItemAmount={cartItemAmount} />
    </div>
  );
}

export default Header;
