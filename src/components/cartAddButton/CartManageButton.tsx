import useCartQuantity from "../../hooks/useCartQuantity/useCartQuantity";
import useCartToggleButton from "../cartToggleButton/useCartToggleButton";
import { Button, Container, Text } from "./CartManageButton.css";

interface CartManageButtonProps {
  cartId?: number;
  quantity: number;
}

export default function CartManageButton({
  cartId,
  quantity,
}: CartManageButtonProps) {
  const { removeItemToCart } = useCartToggleButton();

  const { cartQuantity, increase, decrease } = useCartQuantity({
    cartId,
    quantity,
    removeItemToCart,
  });

  return (
    <div css={Container}>
      <button css={Button} onClick={decrease}>
        -
      </button>
      <p css={Text}>{cartQuantity}</p>
      <button css={Button} onClick={increase}>
        +
      </button>
    </div>
  );
}
