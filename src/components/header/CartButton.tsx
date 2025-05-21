import { CartStyle, PutItemCount } from "./CartButton.css";

interface CartButtonProps {
  cartItemAmount: number;
}

function CartButton({ cartItemAmount }: CartButtonProps) {
  return (
    <button css={CartStyle}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItemAmount}</div>
    </button>
  );
}

export default CartButton;
