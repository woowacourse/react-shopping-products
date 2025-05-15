import * as styles from "./CartButton.style";
import { ComponentProps, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { URLS } from "../../constants/url";
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
      await addCartItem();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    }
  };

  return (
    <button
      {...props}
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
  //이 친구를 버튼을 로딩할때, 보여줘야 하지 않을까요?
  //어떻게 보여주죠?

  return (
    <button
      css={[
        styles.buttonCss,
        isInCart ? styles.inCartCss : styles.notInCartCss,
      ]}
    >
      <span>......</span>
    </button>
  );
}
