import { useState, useMemo } from "react";
import CartList from "../Cart/CartList/CartList";
import * as styles from "./Header.style";
import CartModal from "../Cart/CartModal/CartModal";
import useFetch from "../../hooks/useFetch";
import { useData } from "../../hooks/useData";
import { URLS } from "../../constants/url";
import { commonOpts } from "../../constants/requestHeader";
import { useQueryContext } from "../../contexts/QueryContext";
import { useProductQuery } from "../../hooks/useProductQuery";

export default function Header() {
  const { dataPool, productsQuery, categoryQuery } = useQueryContext();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productURL = useProductQuery(productsQuery, categoryQuery);
  const { refetch: fetchProducts } = useData(
    "products",
    productURL,
    commonOpts,
    false
  );
  const { refetch: fetchCart } = useData(
    "cart-items",
    URLS.CART_ITEMS,
    commonOpts,
    false
  );

  const cartData = dataPool["cart-items"] || [];
  const { fetcher: orderCart } = useFetch(
    URLS.ORDERS,
    { method: "POST", body: JSON.stringify(cartData) },
    false
  );

  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      ),
    [cartData]
  );

  const handleOrder = async () => {
    await orderCart();
    await fetchCart();
    await fetchProducts();
    setIsCartOpen(false);
  };

  const renderCartContent = () => {
    if (!cartData.length) {
      return (
        <div css={styles.emptyCartContainer}>
          <img src="assets/fallback.png" alt="텅빈 카트" />
          텅비엇슈!
          <div css={styles.buttonContainer}>
            <button
              onClick={() => setIsCartOpen(false)}
              css={styles.closeButton}
            >
              닫기
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <CartList cartData={cartData} />

        <div css={styles.totalPrice}>
          <label>총 가격</label>
          <span>{totalPrice.toLocaleString("ko-KR")}원</span>
        </div>
        <div css={styles.buttonContainer}>
          <button onClick={() => setIsCartOpen(false)} css={styles.closeButton}>
            닫기
          </button>
          <button onClick={handleOrder} css={styles.orderButton}>
            주문하기
          </button>
        </div>
      </>
    );
  };

  return (
    <header css={styles.header}>
      <p>SHOP</p>

      <button
        css={styles.cartIcon}
        onClick={() => setIsCartOpen(true)}
        disabled={!cartData.length}
      >
        <div>
          <img src="assets/cart.svg" alt="cart-icon" />
          {cartData.length > 0 && <span>{cartData.length}</span>}
        </div>
      </button>

      {isCartOpen && (
        <CartModal
          isOpen
          onClose={() => setIsCartOpen(false)}
          position="bottom"
        >
          <CartModal.Background>
            <CartModal.Container>
              <CartModal.Header>장바구니</CartModal.Header>
              <CartModal.Content>{renderCartContent()}</CartModal.Content>
            </CartModal.Container>
          </CartModal.Background>
        </CartModal>
      )}
    </header>
  );
}
