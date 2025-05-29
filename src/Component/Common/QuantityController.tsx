import { useState } from "react";
import deleteShoppingCart from "../../api/shoppingCart/deleteShoppingCart";
import patchShoppingCart from "../../api/shoppingCart/patchShoppingCart";
import {
  StyledQuantityController,
  StyledcontrollButton,
  StyledControllImg,
  StyledButtonText,
} from "../../styles/Product/ProductItem.styles";
import ErrorBox from "./ErrorBox";

interface QuantityControllerProps {
  productId: number;
  count: number;
  refetch: () => void;
}

export default function QuantityController({
  productId,
  count,
  refetch,
}: QuantityControllerProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const handleDecrease = async () => {
    if (count === 1) {
      await deleteShoppingCart(productId);
    } else {
      await patchShoppingCart({ productId: productId, quantity: count - 1 });
    }
    refetch();
  };

  const handleIncrease = async () => {
    try {
      await patchShoppingCart({ productId: productId, quantity: count + 1 });
      refetch();
    } catch (error) {
      setErrorMessage((error as Error).message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <StyledQuantityController>
        <StyledcontrollButton
          onClick={handleDecrease}
          data-testid={`remove-btn-${productId}`}
        >
          <StyledControllImg
            src="/assets/decreaseItemButtonIcon.png"
            alt="decreaseItemButtonIcon"
          />
        </StyledcontrollButton>

        <StyledButtonText>{count}</StyledButtonText>

        <StyledcontrollButton onClick={handleIncrease}>
          <StyledControllImg
            src="/assets/increaseItemButtonIcon.png"
            alt="increaseItemButtonIcon"
          />
        </StyledcontrollButton>
      </StyledQuantityController>
    </>
  );
}
