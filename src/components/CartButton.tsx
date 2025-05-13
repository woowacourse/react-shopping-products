import { css } from "@emotion/react";
interface CartButtonProps {
  isInCart: boolean;
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
  backgroundColor: "black",
  color: "white",
});
const notInCart = css({
  backgroundColor: "#EAEAEA",
  color: "black",
});

export default function CartButton({ isInCart }: CartButtonProps) {
  return (
    <button css={[buttonCss, isInCart ? inCart : notInCart]}>
      {isInCart ? (
        <>
          <img src="assets/filledCart.svg" />
          <span>담기</span>
        </>
      ) : (
        <>
          <img src="assets/emptyCart.svg" />
          <span>빼기</span>
        </>
      )}
    </button>
  );
}
