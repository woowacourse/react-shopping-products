import { useState } from "react";
import CartList from "../Cart/CartList/CartList";
import * as styles from "./Header.style";
import CartModal from "../Cart/CartModal/CartModal";
import useFetch from "../../hooks/useFetch";
import { URLS } from "../../constants/url";
import { useData } from "../../hooks/useData";
import { commonOpts } from "../../constants/requestHeader";
import { useQueryContext } from "../../contexts/QueryContext";
import { useProductQuery } from "../../hooks/useProductQuery";

function Header() {
  const { dataPool, productsQuery } = useQueryContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productURL = useProductQuery(productsQuery);
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

  const cartData = dataPool["cart-items"];
  // 적절한 로딩 상태, 에러 상태를 관리하기.
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
                <div css={styles.totalPrice}>
                  <label>총 가격</label>
                  <span>
                    {cartData
                      ?.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      )
                      .toLocaleString("ko-KR")}
                    원
                  </span>
                </div>
                <div css={styles.buttonContainer}>
                  <label hidden={true}> 주문하기</label>
                  <button onClick={handleOrder}>주문하기</button>
                  <label hidden={true}>닫기</label>
                  <button onClick={() => setIsCartOpen(false)}>닫기</button>
                </div>
              </CartModal.Content>
            </CartModal.Container>
          </CartModal.Background>
        </CartModal>
      )}
    </header>
  );
}

export default Header;
