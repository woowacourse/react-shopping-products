import CartIconButton from "./CartIconButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

interface HeaderProps {
  onOpenModal: () => void;
}
function Header({ onOpenModal }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartIconButton onOpenModal={onOpenModal} />
    </div>
  );
}

export default Header;
