import { updateCartItem } from "../../apis/cartItem";
import { IconButton } from "../../../../components/IconButton/IconButton";
import { QuantitySelectorLayout } from "./QuantitySelector.style";
import { useShoppingContext } from "../../context/useShoppingContext";

interface QuantitySelectorProps {
  cartId: number;
  quantity: number;
  maxQuantity: number;
  onChange: () => void;
}

export function QuantitySelector({
  cartId,
  quantity,
  maxQuantity,
  onChange,
}: QuantitySelectorProps) {
  const { dispatch } = useShoppingContext();

  const handleAddCount = async () => {
    if (quantity + 1 > maxQuantity)
      dispatch({
        type: "fetchCartFailure",
        payload: `상품 재고를 초과하여 담을 수 없습니다. 현재 상품의 재고는 ${maxQuantity}개 입니다`,
      });
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
      <IconButton
        imgUrl="./minus.png"
        onClick={handleMinusCount}
        dataTestid="quantity-minus-button"
      />
      <p data-testid="quantity-value">{quantity}</p>
      <IconButton
        imgUrl="./plus.png"
        onClick={handleAddCount}
        dataTestid="quantity-plus-button"
      />
    </div>
  );
}
