import { ORDER_QUANTITY_PER_PRODUCT } from "../../../constants";
import { QuantityControlButton, QuantityControllerContainer } from "./QuantityController.style";

export type QuantityControlType = "increase" | "decrease";

interface QuantityControllerProps {
  quantity: number;
  onChangeQuantity: (type: QuantityControlType) => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export default function QuantityController({
  quantity,
  onChangeQuantity,
  minQuantity = ORDER_QUANTITY_PER_PRODUCT.min,
  maxQuantity = ORDER_QUANTITY_PER_PRODUCT.max,
}: QuantityControllerProps) {
  return (
    <QuantityControllerContainer>
      <QuantityControlButton
        type="button"
        $controlType="decrease"
        onClick={() => onChangeQuantity("decrease")}
        disabled={minQuantity > quantity}
        data-testid="cart-item-decrease-button"
      />
      {quantity}
      <QuantityControlButton
        type="button"
        $controlType="increase"
        onClick={() => onChangeQuantity("increase")}
        disabled={quantity >= maxQuantity}
        data-testid="cart-item-increase-button"
      />
    </QuantityControllerContainer>
  );
}
