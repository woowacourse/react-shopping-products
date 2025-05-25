import { useState } from "react";
import { IMAGE_PATH } from "../../constants/imagePath";
import {
  Button,
  QuantityControllerWrapper,
  Count,
} from "./QuantityController.styled";
import { deleteCartItem, postCartItems } from "../../api/cartItems";
import { useDataContext } from "../../contexts/DataContext";
import { ERROR_MSG } from "../../constants/errorMessage";

type QuantityControllerProps = {
  id: number;
  basketId?: number;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
};

const QuantityController = ({ id, basketId, timeoutRef }: QuantityControllerProps) => {
  const [quantity, setQuantity] = useState(1);
  const { fetchCartItems, setError, setErrorMessage } = useDataContext();

  const increase = async () => {
    try {
      await postCartItems(id, quantity);
      setQuantity((prev) => prev + 1);
    } catch (e) {
      setError(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setError(false);
      }, 2000);

      setErrorMessage(ERROR_MSG.OUT_OF_STOCK);
    }
  };
  

  const decrease = async () => {
    if (quantity === 1 && basketId) {
      await deleteCartItem(basketId);
      await fetchCartItems();
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <QuantityControllerWrapper>
      <Button onClick={decrease}>
        <img src={IMAGE_PATH.MINUS_ICON} alt="minus-icon" />
      </Button>
      <Count>{quantity}</Count>
      <Button onClick={increase}>
        <img src={IMAGE_PATH.PLUS_ICON} alt="plus-icon" />
      </Button>
    </QuantityControllerWrapper>
  );
};

export default QuantityController;
