import { CartStyle } from "./CartButton.css";

function CartButton() {
  return (
    <button css={CartStyle}>
      <img src="/Cart.svg" alt="장바구니 아이콘" />
    </button>
  );
}

export default CartButton;
