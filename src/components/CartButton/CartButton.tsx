import * as styles from "./CartButton.style";
import { ComponentProps, useEffect, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { URLS } from "../../constants/url";
import { useCartContext } from "../../contexts/CartContext";
import QuantityButton from "../QuantityButton/QuantityButton";

interface CartButtonProps extends ComponentProps<"button"> {
  productId: number;
  cartItemId?: number;
}

export default function CartButton({
  productId,
  cartItemId,
  ...props
}: CartButtonProps) {
  const { showError } = useErrorContext();
  const { fetchCart, cartData } = useCartContext();
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const isInCart = cartData?.some((p) => p.product.id === productId);
  const quantity = Number(
    cartData?.find((p) => p.product.id === productId)?.quantity
  );

  const addOptions = useMemo(
    () => ({
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
        )}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    }),
    [productId]
  );

  const { fetcher: addCartItem, error: addError } = useFetch(
    URLS.CART_ITEMS,
    addOptions,
    false
  );

  useEffect(() => {
    if (addError) {
      showError(addError);
    }
  }, [addError, showError]);

  const handleAddCartItem = async () => {
    try {
      setIsFetchLoading(true);
      if (cartData?.length && cartData.length >= 50) {
        throw new Error(`장바구니에 50개 이상의 품목을 담을수 없습니다.`);
      }
      await addCartItem();
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };
  if (isInCart) {
    return (
      <QuantityButton quantity={quantity} cartItemId={Number(cartItemId)} />
    );
  }
  return (
    <button
      {...props}
      onClick={handleAddCartItem}
      disabled={isFetchLoading}
      css={[styles.buttonCss, styles.notInCartCss]}
    >
      <>
        <img src="assets/filledCart.svg" />
        <span>담기</span>
      </>
    </button>
  );
}
