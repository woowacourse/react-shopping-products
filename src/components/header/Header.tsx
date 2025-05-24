import CartButton from "./CartButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

interface HeaderProps {
  openCartModal: () => void;
}

function Header({ openCartModal }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartButton onClick={openCartModal} />
    </div>
  );
}

export default Header;
