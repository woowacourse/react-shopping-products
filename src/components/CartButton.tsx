import { css } from "@emotion/react";
import { ComponentProps } from "react";
import useFetch from "../hooks/useFetch";
interface CartButtonProps extends ComponentProps<"button"> {
  isInCart: boolean;
  onClick: () => void;
}
const buttonCss = css({
  padding: "4px 8px",
  borderRadius: "4px",
  border: "none",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  span: {
    display: "inline-block",
  },
  justifySelf: "flex-end",
});

const inCart = css({
  backgroundColor: "#EAEAEA",
  color: "black",
});
const notInCart = css({
  backgroundColor: "black",
  color: "white",
});

export default function CartButton({
  isInCart,
  onClick,
  ...props
}: CartButtonProps) {
  const { fetcher: addCartItem } = useFetch(
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
        productId: 117,
        quantity: 1,
      }),
    },
    false
  );
  const handleButtonClick = () => {
    addCartItem();
    onClick();
  };

  return (
    <button
      {...props}
      onClick={handleButtonClick}
      css={[buttonCss, isInCart ? inCart : notInCart]}
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
