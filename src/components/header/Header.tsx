import CartButton from "./CartButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

interface HeaderProps {
  onOpenModal: () => void;
}
function Header({ onOpenModal }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartButton onOpenModal={onOpenModal} />
    </div>
  );
}

export default Header;
