import { CartStyle, PutItemCount } from "./CartButton.css";

interface CartButtonProps {
  cartItemAmount: number;
  onClick: () => void;
}

function CartButton({ cartItemAmount, onClick }: CartButtonProps) {
  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItemAmount}</div>
    </button>
  );
}

export default CartButton;
