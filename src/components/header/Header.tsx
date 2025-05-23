import CartButton from "./CartButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

interface HeaderProps {
  cartItemAmount: number;
  openCartModal: () => void;
}

function Header({ cartItemAmount, openCartModal }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartButton onClick={openCartModal} cartItemAmount={cartItemAmount} />
    </div>
  );
}

export default Header;
