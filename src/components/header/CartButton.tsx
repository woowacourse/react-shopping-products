import { useCart } from "../../hooks/useCart";
import { CartStyle, PutItemCount } from "./CartButton.css";

function CartButton() {
  const { cartItemIds } = useCart();
  return (
    <button css={CartStyle}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItemIds.length}</div>
    </button>
  );
}

export default CartButton;
