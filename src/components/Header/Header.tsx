import { useCartContext } from "../../contexts/CartContext";
import * as styles from "./Header.style";

function Header() {
  const { cartData } = useCartContext();
  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button css={styles.cartIcon}>
        <div>
          <img src="assets/cart.svg" alt="cart-icon" />
          <span hidden={cartData?.length === 0}>{cartData?.length}</span>
        </div>
      </button>
    </header>
  );
}

export default Header;
