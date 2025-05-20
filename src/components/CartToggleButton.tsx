import { CartToggleButtonWrapper, CartToggleButtonText } from '../styles/CartToggleButton';
import { IMAGE_PATH } from '../constants/imagePath';
import { ERROR_MSG } from '../constants/errorMessage';
import { deleteCartItem, postCartItems } from '../api/cartItems';
import { useError } from '../context/ErrorContext';

type CartToggleButtonProps = {
  id: number;
  isInCart: boolean;
  cartId?: number;
  isNotCartCountMAX: boolean;
};

export type CartToggleButtonWrapperProps = {
  isInCart: boolean;
};

type handleCartToggleButtonProps = {
  isInCart: boolean;
  productId: number;
  cartId?: number;
  isNotCartCountMAX: boolean;
  setErrorMessage: (message: string) => void;
};

const handleCartToggleButton = async ({
  isInCart,
  productId,
  cartId,
  isNotCartCountMAX,
  setErrorMessage,
}: handleCartToggleButtonProps) => {
  if (!isInCart) {
    if (!isNotCartCountMAX) {
      setErrorMessage(ERROR_MSG.CART_LIMIT_EXCEEDED);
      throw new Error(ERROR_MSG.CART_LIMIT_EXCEEDED);
    }
    await postCartItems(productId);
  } else if (cartId !== undefined) {
    await deleteCartItem(cartId);
  }
};

const CartToggleButton = ({ id, isInCart, cartId, isNotCartCountMAX }: CartToggleButtonProps) => {
  const { setErrorMessage } = useError();
  const imageSrc = isInCart ? IMAGE_PATH.SHOPPING_CART_REMOVE : IMAGE_PATH.SHOPPING_CART_ADD;

  return (
    <CartToggleButtonWrapper
      isInCart={isInCart}
      onClick={() =>
        handleCartToggleButton({
          isInCart,
          productId: id,
          cartId,
          isNotCartCountMAX,
          setErrorMessage,
        })
      }
    >
      <img src={imageSrc} alt="shopping_cart" />
      <CartToggleButtonText isInCart={isInCart}>{isInCart ? '빼기' : '담기'}</CartToggleButtonText>
    </CartToggleButtonWrapper>
  );
};

export default CartToggleButton;
