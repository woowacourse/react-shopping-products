import { useState, useMemo } from "react";

import useFetch from "@/hooks/useFetch";
import useQueryData from "@/hooks/useQueryData";
import { useProductQuery } from "@/hooks/useProductQuery";

import { useErrorContext } from "@/contexts/ErrorContext";
import { useQueryContext } from "@/contexts/QueryContext";

import { URLS } from "@/constants/url";

import CartList from "../Cart/CartList/CartList";
import CartModal from "../Cart/CartModal/CartModal";

import * as styles from "./Header.style";
import {
  cartQueryOptions,
  productQueryOptions,
} from "@/constants/requestOptions";
import { commonOpts } from "@/constants/requestHeader";

export default function Header() {
  const { dataPool, productsQuery, categoryQuery } = useQueryContext();
  const { showError } = useErrorContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const cartData = dataPool["cart-items"] || [];
  const productURL = useProductQuery(productsQuery, categoryQuery);

  const orderOptions = useMemo(
    () => ({
      ...commonOpts,
      method: "POST",
      body: JSON.stringify(cartData),
    }),
    [cartData]
  );

  const { loadData: loadProducts } = useQueryData("products", {
    url: productURL,
    ...productQueryOptions,
  });
  const { loadData: loadCart } = useQueryData("cart-items", cartQueryOptions);

  const { fetcher: orderCart } = useFetch(URLS.ORDERS, orderOptions, false, [
    cartData,
  ]);

  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      ),
    [cartData]
  );

  const handleOrder = async () => {
    try {
      setIsOrderProcessing(true);
      await orderCart();
      await loadCart();
      await loadProducts();
    } catch (error) {
      if (error instanceof Error) showError(error);
    } finally {
      setIsOrderProcessing(false);
      setIsCartOpen(false);
    }
  };

  const renderCartContent = () => {
    if (!cartData.length) {
      return (
        <div css={styles.emptyCartContainerCss}>
          <img src="assets/fallback.png" alt="텅빈 카트" />
          근데 장바구니가 텅 비었나부렁!
          <div css={styles.buttonContainerCss}>
            <button
              onClick={() => setIsCartOpen(false)}
              css={styles.closeButtonCss}
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

        <div css={styles.totalPriceCss}>
          <label>총 가격</label>
          <span>{totalPrice.toLocaleString("ko-KR")}원</span>
        </div>
        <div css={styles.buttonContainerCss}>
          <button
            onClick={() => setIsCartOpen(false)}
            css={styles.closeButtonCss}
          >
            닫기
          </button>
          <button
            onClick={handleOrder}
            css={styles.orderButtonCss}
            disabled={isOrderProcessing}
          >
            주문하기
          </button>
        </div>
      </>
    );
  };

  return (
    <header css={styles.headerCss}>
      <p>SHOP</p>

      <button
        css={styles.cartIconCss}
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
              <CartModal.Header>뭔가 사실려고용?</CartModal.Header>
              <CartModal.Content>{renderCartContent()}</CartModal.Content>
            </CartModal.Container>
          </CartModal.Background>
        </CartModal>
      )}
    </header>
  );
}
