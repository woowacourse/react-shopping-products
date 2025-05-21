import * as styles from "./QuantityButton.style";
import { useState, useEffect, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useCartContext } from "../../contexts/CartContext";
import { URLS } from "../../constants/url";
import { commonOpts } from "../../constants/header";
interface QuantityButtonProps {
  productId: number;
  cartItemId: number;
}

export default function QuantityButton({
  productId,
  cartItemId,
}: QuantityButtonProps) {
  const [loading, setLoading] = useState(false);
  const { fetchCart, cartData } = useCartContext();
  const { showError } = useErrorContext();

  const quantity =
    cartData?.find((item) => item.product.id === productId)?.quantity ?? 0;

  const { fetcher: deleteItem, error: deleteError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    { ...commonOpts, method: "DELETE" },
    false
  );
  const { fetcher: increaseItem, error: increaseError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    {
      ...commonOpts,
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity + 1 }),
    },
    false,
    [quantity]
  );
  const { fetcher: decreaseItem, error: decreaseError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItemId}`,
    {
      ...commonOpts,
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity - 1 }),
    },
    false,
    [quantity]
  );

  const performRequest = useCallback(
    async (action: () => Promise<void>) => {
      setLoading(true);
      try {
        await action();
        await fetchCart();
      } catch (error) {
        if (error instanceof Error) showError(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchCart, showError]
  );

  const handleMinusClick = useCallback(() => {
    if (quantity <= 1) {
      performRequest(deleteItem);
      return;
    }
    performRequest(decreaseItem);
  }, [quantity, deleteItem, decreaseItem, performRequest]);

  const handlePlusClick = useCallback(() => {
    performRequest(increaseItem);
  }, [increaseItem, performRequest]);

  useEffect(() => {
    [deleteError, increaseError, decreaseError].forEach((err) => {
      if (err) showError(err);
    });
  }, [deleteError, increaseError, decreaseError, showError]);

  return (
    <div css={styles.quantityButtonContainer}>
      <button
        css={styles.quantityButton}
        onClick={handleMinusClick}
        disabled={loading}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        css={styles.quantityButton}
        onClick={handlePlusClick}
        disabled={loading}
      >
        +
      </button>
    </div>
  );
}
