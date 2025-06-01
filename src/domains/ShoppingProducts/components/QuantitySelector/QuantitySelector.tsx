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

  const showCartUpdateError = (message: string) => {
    dispatch({
      type: "error",
      queryKey: "cart",
      payload: message,
    });
  };

  const handleAddCount = async () => {
    if (quantity === maxQuantity) {
      showCartUpdateError("재고 수량을 초과하여 담을 수 없습니다.");
      return;
    }

    try {
      await updateCartItem({ id: cartId, quantity: quantity + 1 });
      onChange();
    } catch (error) {
      showCartUpdateError(`장바구니 상품 수량을 변경하는데 실패했습니다`);
    }
  };

  const handleMinusCount = async () => {
    if (quantity < 0) return;

    try {
      await updateCartItem({ id: cartId, quantity: quantity - 1 });
      onChange();
    } catch (error) {
      showCartUpdateError(`장바구니 상품 수량을 변경하는데 실패했습니다`);
    }
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
