import { useState } from "react";
import { IMAGE_PATH } from "../../constants/imagePath";
import {
  Button,
  QuantityControllerWrapper,
  Count,
} from "./QuantityController.styled";

const QuantityController = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
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
