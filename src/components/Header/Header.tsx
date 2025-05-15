import { useCartContext } from "../../contexts/CartContext";
import * as styles from "./Header.style";

function Header() {
  const { cartLength } = useCartContext();
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
