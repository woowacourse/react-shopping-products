import { useCartContext } from "../../contexts/CartContext";
import * as styles from "./Header.style";

function Header() {
  const { cartLength } = useCartContext();
  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button css={styles.cartIcon}>
        <div hidden={cartLength === 0}>
          <img src="assets/cart.svg" alt="cart-icon" />
          <span>{cartLength}</span>
        </div>
      </button>
    </header>
  );
}

export default Header;
