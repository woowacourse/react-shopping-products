import CartManageButton from "../cartAddButton/CartManageButton";
import { ButtonContainer } from "./CartToggleButton.css";
import useCartToggleButton from "./useCartToggleButton";

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
  const { addItemToCart } = useCartToggleButton();

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
