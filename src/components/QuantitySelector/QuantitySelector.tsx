import { updateCartItem } from "../../api/cartItem";
import { IconButton } from "../IconButton/IconButton";
import { QuantitySelectorLayout } from "./QuantitySelector.style";

interface QuantitySelectorProps {
  cartId: number;
  quantity: number;
  onChange: () => void;
}

export function QuantitySelector({
  cartId,
  quantity,
  onChange,
}: QuantitySelectorProps) {
  const handleAddCount = async () => {
    await updateCartItem({ id: cartId, quantity: quantity + 1 });
    onChange();
  };
  const handleMinusCount = async () => {
    if (quantity < 0) return;
    await updateCartItem({ id: cartId, quantity: quantity - 1 });
    onChange();
  };
  return (
    <div css={QuantitySelectorLayout}>
      <IconButton imgUrl="./minus.png" onClick={handleMinusCount} />
      <p>{quantity}</p>
      <IconButton imgUrl="./plus.png" onClick={handleAddCount} />
    </div>
  );
}
