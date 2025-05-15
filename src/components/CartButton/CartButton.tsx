import * as styles from "./CartButton.style";
import { ComponentProps, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { URLS } from "../../constants/url";
import { useCartContext } from "../../contexts/CartContext";
interface CartButtonProps extends ComponentProps<"button"> {
  isInCart: boolean;
  refetchCart: () => Promise<void>;
  productId: number;
  cartItemId?: number;
}

export default function CartButton({
  isInCart,
  refetchCart,
  productId,
  cartItemId,
  ...props
}: CartButtonProps) {
  const { showError } = useErrorContext();
  const { cartLength } = useCartContext();
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const { fetcher: deleteCartItem, error: deleteError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
        )}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    },
    false
  );
  const { fetcher: addCartItem, error: addError } = useFetch(
    URLS.CART_ITEMS,
    {
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
    },
    false
  );

  useEffect(() => {
    if (deleteError) {
      showError(deleteError);
    }
  }, [deleteError]);

  useEffect(() => {
    if (addError) {
      showError(addError);
    }
  }, [addError]);

  const handleDeleteCartItem = async () => {
    try {
      setIsFetchLoading(true);
      await deleteCartItem();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };

  const handleAddCartItem = async () => {
    try {
      setIsFetchLoading(true);
      if (cartLength && cartLength >= 50) {
        throw new Error(`장바구니 갯수가 50개 이상 담을수 없습니다.`);
      }
      await addCartItem();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };
  return (
    <button
      {...props}
      disabled={isFetchLoading}
      onClick={isInCart ? handleDeleteCartItem : handleAddCartItem}
      css={[
        styles.buttonCss,
        isInCart ? styles.inCartCss : styles.notInCartCss,
      ]}
    >
      {isInCart ? (
        <>
          <img src="assets/emptyCart.svg" />
          <span>빼기</span>
        </>
      ) : (
        <>
          <img src="assets/filledCart.svg" />
          <span>담기</span>
        </>
      )}
    </button>
  );
}
