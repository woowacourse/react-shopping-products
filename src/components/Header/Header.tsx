import { useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import CartList from "../Cart/CartList/CartList";
import * as styles from "./Header.style";
import CartModal from "../Cart/CartModal/CartModal";
import { useProductContext } from "../../contexts/ProductContext";
import useFetch from "../../hooks/useFetch";
import { URLS } from "../../constants/url";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { fetchCart, cartData } = useCartContext();
  const { fetchProducts } = useProductContext();

  const handleOrder = async () => {
    await orderCart();
    await fetchCart();
    await fetchProducts();
    setIsCartOpen(false);
  };
  const { fetcher: orderCart } = useFetch(
    URLS.ORDERS,
    {
      method: "POST",
      body: JSON.stringify(cartData),
    },
    false
  );

  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button css={styles.cartIcon} onClick={() => setIsCartOpen(true)}>
        <div>
          <img src="assets/cart.svg" alt="cart-icon" />
          <span hidden={cartData?.length === 0}>{cartData?.length}</span>
        </div>
      </button>
      {isCartOpen && (
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          position="bottom"
        >
          <CartModal.Background>
            <CartModal.Container>
              <CartModal.Header>구입 하실까용?</CartModal.Header>
              <CartModal.Content>
                <CartList cartData={cartData} />
                <button onClick={handleOrder}>주문하기</button>
              </CartModal.Content>
            </CartModal.Container>
          </CartModal.Background>
        </CartModal>
      )}
    </header>
  );
}

export default Header;
