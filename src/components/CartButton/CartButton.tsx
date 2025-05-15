import * as styles from "./CartButton.style";
import { ComponentProps, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";

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

  const { fetcher: deleteCartItem, error: deleteError } = useFetch(
    `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/${cartItemId}`,
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
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items",
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
      await deleteCartItem();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
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
