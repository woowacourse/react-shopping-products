import {
  CartToggleButtonWrapper,
  CartToggleButtonText,
} from "./CartToggleButton.styled";
import { IMAGE_PATH } from "../../constants/imagePath";
import { ERROR_MSG } from "../../constants/errorMessage";
import { deleteCartItem, postCartItems } from "../../api/cartItems";
import { useCartContext, useUIContext } from "../../contexts/DataContext";
import { ADD_TO_CART_QUANTITY } from "../../constants/basket";

type SharedToggleProps = {
  isNotBasketCountMAX: boolean;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
};

type addProductInBasketProps = SharedToggleProps & {
  setError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  showErrorMessage: (msg: string) => void
};

type handleCartToggleButtonProps = SharedToggleProps & {
  isNotBasketCountMAX: boolean;
  isInBascket: boolean;
  productId: number;
  basketId?: number;
  fetchCartItems: (value?: boolean) => void;
  setError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  showErrorMessage: (msg: string) => void
};

type CartToggleButtonProps = {
  id: number;
  isInBascket: boolean;
  basketId?: number;
  isNotBasketCountMAX: boolean;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  isSoldOut?: boolean;
};

export type CartToggleButtonWrapperProps = {
  isInBascket: boolean;
};

const canAddProductToBasket = ({
  isNotBasketCountMAX,
  showErrorMessage
}: addProductInBasketProps) => {
  if (!isNotBasketCountMAX) {
    showErrorMessage(ERROR_MSG.BASKET_LIMIT_EXCEEDED);
    return false;
  }
  return true;
};

const handleCartToggleButton = async ({
  isInBascket,
  productId,
  basketId,
  isNotBasketCountMAX,
  timeoutRef,
  fetchCartItems,
  setError,
  setErrorMessage,
  showErrorMessage,
}: handleCartToggleButtonProps) => {
  if (!isInBascket) {
    if (
      !canAddProductToBasket({
        isNotBasketCountMAX,
        setError,
        timeoutRef,
        setErrorMessage,
        showErrorMessage,
      })
    )
      return;

    try {
      await postCartItems(productId, ADD_TO_CART_QUANTITY);
    } catch (error) {
      showErrorMessage(ERROR_MSG.ADD_BASKET_FAIL);
    }
  } else if (basketId !== undefined) {
    try {
      await deleteCartItem(basketId);
    } catch (error) {
      showErrorMessage(ERROR_MSG.DELETE_BASKET_FAIL);
    }
  }
  try {
    await fetchCartItems(false);
  } catch (error) {
    showErrorMessage(ERROR_MSG.PRODUCT_FETCH_FAIL);
  }
  
};

const CartToggleButton = ({
  id,
  isInBascket,
  basketId,
  isNotBasketCountMAX,
  timeoutRef,
  isSoldOut,
}: CartToggleButtonProps) => {
  const imageSrc = isInBascket
    ? IMAGE_PATH.SHOPPIN_CART_REMOVE
    : IMAGE_PATH.SHOPPIN_CART_ADD;
    const { fetchCartItems } = useCartContext();
    const { setError, setErrorMessage, showErrorMessage } = useUIContext();

  return (
    !isSoldOut && (
      <CartToggleButtonWrapper
        isInBascket={isInBascket}
        onClick={() =>
          handleCartToggleButton({
            isInBascket,
            productId: id,
            basketId,
            isNotBasketCountMAX,
            timeoutRef,
            fetchCartItems,
            setError,
            setErrorMessage,
            showErrorMessage,
          })
        }
      >
        <img src={imageSrc} alt="shopping_cart" />
        <CartToggleButtonText isInBascket={isInBascket}>
          {isInBascket ? "빼기" : "담기"}
        </CartToggleButtonText>
      </CartToggleButtonWrapper>
    )
  );
};

export default CartToggleButton;
