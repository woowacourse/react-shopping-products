import * as styles from "./Header.style";

interface headerProps {
  cartLength?: number;
}
function Header({ cartLength }: headerProps) {
  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button css={styles.cartIcon}>
        <img src="assets/cart.svg" alt="cart-icon" />
        <span hidden={cartLength === 0}>{cartLength}</span>
      </button>
    </header>
  );
}

export default Header;
