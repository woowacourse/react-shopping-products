import {
  CartToggleButtonWrapper,
  CartToggleButtonText,
} from "../styles/CartToggleButton";
import { IMAGE_PATH } from "../constants/imagePath";
import { ERROR_MSG } from "../constants/errorMessage";
import { deleteCartItem, postCartItems } from "../api/cartItems";

type CartToggleButtonProps = {
  id: number;
  isInBascket: boolean;
  basketId?: number;
  isNotBasketCountMAX: boolean;
  setError: (value: boolean) => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
};

export type CartToggleButtonWrapperProps = {
  isInBascket: boolean;
};

type handleCartToggleButtonProps = {
  isInBascket: boolean;
  productId: number;
  basketId?: number;
  isNotBasketCountMAX: boolean;
  setError: (value: boolean) => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
};

const handleCartToggleButton = async ({
  isInBascket,
  productId,
  basketId,
  isNotBasketCountMAX,
  setError,
  timeoutRef,
}: handleCartToggleButtonProps) => {
  if (!isInBascket) {
    if (!isNotBasketCountMAX) {
      setError(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setTimeout(() => {
        setError(false);
      }, 2000);

      throw new Error(ERROR_MSG.BASKET_LIMIT_EXCEEDED);
    }
    await postCartItems(productId);
  } else if (basketId !== undefined) {
    await deleteCartItem(basketId);
  }
};

const CartToggleButton = ({
  id,
  isInBascket,
  basketId,
  isNotBasketCountMAX,
  setError,
  timeoutRef,
}: CartToggleButtonProps) => {
  const imageSrc = isInBascket
    ? IMAGE_PATH.SHOPPIN_CART_REMOVE
    : IMAGE_PATH.SHOPPIN_CART_ADD;

  return (
    <CartToggleButtonWrapper
      isInBascket={isInBascket}
      onClick={() =>
        handleCartToggleButton({
          isInBascket,
          productId: id,
          basketId,
          isNotBasketCountMAX,
          setError,
          timeoutRef,
        })
      }
    >
      <img src={imageSrc} alt="shopping_cart" />
      <CartToggleButtonText isInBascket={isInBascket}>
        {isInBascket ? "빼기" : "담기"}
      </CartToggleButtonText>
    </CartToggleButtonWrapper>
  );
};

export default CartToggleButton;
