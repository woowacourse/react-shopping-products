import { CART } from "../../constants";
import { useUpdateItemQuantity } from "../../hooks";
import { CounterButton } from "../Button";
import * as S from "./QuantityControl.styled";

interface QuantityControlsProps {
  cartItemId: number;
  quantity: number;
}

export const QuantityControls = ({ cartItemId, quantity }: QuantityControlsProps) => {
  const { mutate: updateQuantity } = useUpdateItemQuantity();

  const incrementQuantity = () => {
    updateQuantity({ cartItemId, quantity: quantity + CART.QUANTITY_CHANGE_STEP });
  };

  const decrementQuantity = () => {
    updateQuantity({ cartItemId, quantity: quantity - CART.QUANTITY_CHANGE_STEP });
  };

  return (
    <S.StyledProductQuantityContainer>
      <CounterButton type="decrement" onClick={decrementQuantity} />
      <S.StyledProductQuantityText>{quantity}</S.StyledProductQuantityText>
      <CounterButton type="increment" onClick={incrementQuantity} />
    </S.StyledProductQuantityContainer>
  );
};
