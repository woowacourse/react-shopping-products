import { CartStyle, PutItemCount } from "./CartButton.css";
import useCart from "../../hooks/useCart/useCart";

interface CartButtonProps {
  onClick: () => void;
}

function CartButton({ onClick }: CartButtonProps) {
  const { cartItemIds } = useCart();

  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItemIds?.length}</div>
    </button>
  );
}

export default CartButton;
