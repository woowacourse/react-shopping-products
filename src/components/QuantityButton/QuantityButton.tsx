import * as styles from "./QuantityButton.style";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { URLS } from "../../constants/url";
import { useCartContext } from "../../contexts/CartContext";
import { useProductContext } from "../../contexts/ProductContext";

interface QuantityButtonProps {
  quantity: number;
  cartItemId: number;
}

export default function QuantityButton({
  quantity,
  cartItemId,
}: QuantityButtonProps) {
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const { fetchCart } = useCartContext();
  const { showError } = useErrorContext();
  const { productsData } = useProductContext();

  const productQuantity = productsData?.find(
    (p) => p.id === cartItemId
  )?.quantity;

  const deleteOptions = {
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
      )}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  const addOptions = {
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
      )}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      productId: cartItemId,
      quantity: quantity + 1,
    }),
  };
  const subtractOptions = {
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
      )}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      productId: cartItemId,
      quantity: quantity - 1,
    }),
  };
  const { fetcher: subtractCartItem, error: subtractError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    subtractOptions,
    false
  );
  const { fetcher: deleteCartItem, error: deleteError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    deleteOptions,
    false
  );
  const { fetcher: addCartItem, error: addError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    addOptions,
    false
  );
  const handleDeleteCartItem = async () => {
    try {
      setIsFetchLoading(true);
      await deleteCartItem();
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };
  const handleAddCartItemQuantity = async () => {
    try {
      setIsFetchLoading(true);
      if (productQuantity && quantity >= productQuantity) {
        throw new Error(
          `장바구니에 담을 수 있는 최대 수량은 ${productQuantity}개 입니다.`
        );
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
  const handleSubtractCartItemQuantity = async () => {
    try {
      setIsFetchLoading(true);
      if (quantity <= 1) {
        await deleteCartItem();
      } else {
        await subtractCartItem();
      }
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };
  useEffect(() => {
    if (deleteError) {
      showError(deleteError);
    }
  }, [deleteError, showError]);
  useEffect(() => {
    if (addError) {
      showError(addError);
    }
  }, [addError, showError]);
  useEffect(() => {
    if (subtractError) {
      showError(subtractError);
    }
  }, [subtractError, showError]);

  return (
    <div css={styles.quantityButtonContainer}>
      <button
        css={styles.quantityButton}
        onClick={
          quantity > 1 ? handleSubtractCartItemQuantity : handleDeleteCartItem
        }
        disabled={isFetchLoading}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        css={styles.quantityButton}
        onClick={handleAddCartItemQuantity}
        disabled={isFetchLoading}
      >
        +
      </button>
    </div>
  );
}
