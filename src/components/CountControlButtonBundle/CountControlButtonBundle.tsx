import { useControlCart, useError } from "@hooks/index";
import { CountButton } from "../Button";
import * as CCBB from "./CountControlButtonBundle.style";

interface Props {
  amount: number;
  cartItemId: number | undefined;
  cartItemQuantity: number | undefined;
}

const CountControlButtonBundle = ({
  amount,
  cartItemId,
  cartItemQuantity,
}: Props) => {
  const { showError } = useError();

  const { increaseToCart, decreaseToCart } = useControlCart({
    cartItemId,
    quantity: cartItemQuantity,
  });

  const handleIncrementAmount = () => {
    try {
      increaseToCart.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  const handleDecrementAmount = () => {
    try {
      decreaseToCart.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  return (
    <CCBB.Style>
      <CountButton type="minus" onClick={handleDecrementAmount} />
      <CCBB.Amount>{amount}</CCBB.Amount>
      <CountButton type="plus" onClick={handleIncrementAmount} />
    </CCBB.Style>
  );
};
export default CountControlButtonBundle;
