import { IMAGE_PATH } from "../../constants/imagePath";
import {
  Button,
  QuantityControllerWrapper,
  Count,
} from "./QuantityController.styled";
import { deleteCartItem, postCartItems } from "../../api/cartItems";
import { useDataContext } from "../../contexts/DataContext";
import { ERROR_MSG } from "../../constants/errorMessage";
import { showErrorMessageProps } from "../ProductCard/ProductCard";
import { ADD_TO_CART_QUANTITY, REMOVE_FROM_CART_QUANTITY } from "../../constants/basket";

type QuantityControllerProps = {
  id: number;
  basketId?: number;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  size?: "default" | "small";
  showErrorMessage: (props: showErrorMessageProps) => void;
};

const QuantityController = ({
  id,
  basketId,
  timeoutRef,
  size,
  showErrorMessage,
}: QuantityControllerProps) => {
  const { cartItems, fetchCartItems, setError, setErrorMessage } =
    useDataContext();
  const quantity =
    cartItems?.find((item) => item.productId === id)?.quantity ?? 1;

  const increase = async () => {
    try {
      await postCartItems(id, ADD_TO_CART_QUANTITY);
      fetchCartItems();
    } catch (e) {
      showErrorMessage({
        timeoutRef,
        setError,
        setErrorMessage,
        errorMessage: ERROR_MSG.OUT_OF_STOCK,
      });
    }
  };

  const decrease = async () => {
    if (quantity === 1 && basketId) {
      try {
        await deleteCartItem(basketId);
        await fetchCartItems();
      } catch (error) {
        showErrorMessage({
          timeoutRef,
          setError,
          setErrorMessage,
          errorMessage: ERROR_MSG.DELETE_BASKET_FAIL,
        });
      }
    } else if (quantity > 1) {
      try {
        await postCartItems(id, REMOVE_FROM_CART_QUANTITY);
        await fetchCartItems();
      } catch (error) {
        showErrorMessage({
          timeoutRef,
          setError,
          setErrorMessage,
          errorMessage: ERROR_MSG.ADD_BASKET_FAIL,
        });
      }
    }
  };  

  return (
    <QuantityControllerWrapper size={size}>
      <Button size={size} onClick={decrease}>
        <img src={IMAGE_PATH.MINUS_ICON} alt="minus-icon" />
      </Button>
      <Count size={size}>{quantity}</Count>
      <Button size={size} onClick={increase}>
        <img src={IMAGE_PATH.PLUS_ICON} alt="plus-icon" />
      </Button>
    </QuantityControllerWrapper>
  );
};

export default QuantityController;
