import deleteShoppingCart from "../../api/deleteShoppingCart";
import patchShoppingCart from "../../api/patchShoppingCart";
import {
  StyledQuantityController,
  StyledcontrollButton,
  StyledControllImg,
  StyledButtonText,
} from "../../styles/Product/ProductItem.styles";

interface QuantityControllerProps {
  productId: number;
  count: number;
  maxCount?: number;
  refetch: () => void;
}

export default function QuantityController({
  productId,
  count,
  maxCount = 50,
  refetch,
}: QuantityControllerProps) {
  const handleDecrease = async () => {
    if (count === 1) {
      await deleteShoppingCart(productId);
    } else {
      await patchShoppingCart(productId, count - 1);
    }
    refetch();
  };

  const handleIncrease = async () => {
    if (count >= maxCount) {
      throw new Error("50개 초과");
    }
    await patchShoppingCart(productId, count + 1);
    refetch();
  };

  return (
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
  );
}
