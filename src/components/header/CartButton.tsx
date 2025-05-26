import { CartStyle, PutItemCount } from "./CartButton.css";
import { useData } from "../../provider/DataProvider";

interface CartButtonProps {
  onClick: () => void;
}

function CartButton({ onClick }: CartButtonProps) {
  const { data } = useData();

  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{data.cart.length}</div>
    </button>
  );
}

export default CartButton;
