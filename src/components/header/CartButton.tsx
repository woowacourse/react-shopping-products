import { useData } from "../../hooks/useData";
import { CartStyle, PutItemCount } from "./CartButton.css";

interface CartButtonProps {
  onOpenModal: () => void;
}

function CartButton({ onOpenModal }: CartButtonProps) {
  const { cartItemIds } = useData();
  return (
    <button css={CartStyle} onClick={onOpenModal}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItemIds.length}</div>
    </button>
  );
}

export default CartButton;
