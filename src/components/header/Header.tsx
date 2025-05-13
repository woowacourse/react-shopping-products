import { CartButton, HeaderContainer, HeaderTitle } from "./Header.css";

function Header() {
  return (
    <div css={HeaderContainer}>
      <div css={HeaderTitle}>SHOP</div>
      <button css={CartButton}>
        <img src="/Cart.svg" alt="장바구니 아이콘" />
      </button>
    </div>
  );
}

export default Header;
