import {
  CartToggleButtonWrapper,
  CartToggleButtonText,
} from "./CartToggleButton.styled";
import { IMAGE_PATH } from "../../constants/imagePath";
import { ERROR_MSG } from "../../constants/errorMessage";
import { deleteCartItem, postCartItems } from "../../api/cartItems";

type SharedToggleProps = {
  isNotBasketCountMAX: boolean;
  setError: (value: boolean) => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  setErrorMessage: (value: string) => void;
};

type addProductInBasketProps = SharedToggleProps;
type handleCartToggleButtonProps = SharedToggleProps & {
  isInBascket: boolean;
  productId: number;
  basketId?: number;
  fetchCartItems: (value?: boolean) => Promise<void>;
};

type CartToggleButtonProps = {
  id: number;
  isInBascket: boolean;
  basketId?: number;
  isNotBasketCountMAX: boolean;
  setError: (value: boolean) => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  fetchCartItems: (value?: boolean) => Promise<void>;
  setErrorMessage: (value: string) => void;
};

export type CartToggleButtonWrapperProps = {
  isInBascket: boolean;
};

const canAddProductToBasket = ({
  isNotBasketCountMAX,
  setError,
  timeoutRef,
  setErrorMessage,
}: addProductInBasketProps) => {
  if (!isNotBasketCountMAX) {
    setError(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setError(false);
    }, 2000);

    setErrorMessage(ERROR_MSG.BASKET_LIMIT_EXCEEDED);
    return false;
  }
  return true;
};

const handleCartToggleButton = async ({
  isInBascket,
  productId,
  basketId,
  isNotBasketCountMAX,
  setError,
  timeoutRef,
  fetchCartItems,
  setErrorMessage,
}: handleCartToggleButtonProps) => {
  if (!isInBascket) {
    if (
      !canAddProductToBasket({
        isNotBasketCountMAX,
        setError,
        timeoutRef,
        setErrorMessage,
      })
    )
      return;
    await postCartItems(productId);
  } else if (basketId !== undefined) {
    await deleteCartItem(basketId);
  }
  await fetchCartItems(false);
};

const CartToggleButton = ({
  id,
  isInBascket,
  basketId,
  isNotBasketCountMAX,
  setError,
  timeoutRef,
  fetchCartItems,
  setErrorMessage,
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
          fetchCartItems,
          setErrorMessage,
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
