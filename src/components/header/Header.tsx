import CartButton from "./CartButton";
import { HeaderContainer, HeaderTitle } from "./Header.css";

function Header() {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <CartButton />
    </div>
  );
}

export default Header;
