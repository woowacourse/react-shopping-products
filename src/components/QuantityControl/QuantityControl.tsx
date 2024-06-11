import { CART } from "../../constants";
import { useUpdateItemQuantity } from "../../hooks/useUpdateItemQuantity";
import { CounterButton } from "../Button";
import {
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from "./QuantityControl.styled";

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
    <StyledProductQuantityContainer>
      <CounterButton type="decrement" onClick={decrementQuantity} />
      <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
      <CounterButton type="increment" onClick={incrementQuantity} />
    </StyledProductQuantityContainer>
  );
};
