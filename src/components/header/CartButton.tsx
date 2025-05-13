import { CartStyle, PutItemCount } from "./CartButton.css";

function CartButton() {
  return (
    <button css={CartStyle}>
      <img src="/Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>2</div>
    </button>
  );
}

export default CartButton;
