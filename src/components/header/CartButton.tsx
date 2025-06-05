import { CartStyle, PutItemCount } from "./CartButton.css";
import { useCartQuery } from "../../hooks/useData";

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { data: cartItems, isLoading } = useCartQuery();

  if (isLoading) return "로딩중...";

  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItems.length}</div>
    </button>
  );
}
