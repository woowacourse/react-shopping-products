import CartManageButton from "../cartManageButton/CartManageButton";
import { ButtonContainer } from "./CartToggleButton.css";
import useCartAddRemove from "../../hooks/useCartAddRemove";

interface CartToggleButtonProps {
  isSoldOut: boolean;
  quantity: number;

  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
}

function CartToggleButton({
  isSoldOut,
  quantity,

  productId,
  cartId,
  cartAmount,
  isAdded,
}: CartToggleButtonProps) {
  const { addItemToCart } = useCartAddRemove();

  return isAdded ? (
    <CartManageButton quantity={quantity} cartId={cartId} />
  ) : (
    <button
      css={ButtonContainer}
      onClick={() =>
        addItemToCart({
          productId,
          cartAmount,
        })
      }
      disabled={isSoldOut}
    >
      <img src={"addCart.svg"} alt={`담기 아이콘`} />
      <p>{"담기"}</p>
    </button>
  );
}

export default CartToggleButton;
