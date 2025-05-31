import useCartQuantity from "../../hooks/useCartQuantity";
import useCartAddRemove from "../../hooks/useCartAddRemove";
import { Button, Container, Text } from "./CartManageButton.css";

interface CartManageButtonProps {
  cartId?: number;
  quantity: number;
}

export default function CartManageButton({
  cartId,
  quantity,
}: CartManageButtonProps) {
  const { removeItemToCart } = useCartAddRemove();

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
