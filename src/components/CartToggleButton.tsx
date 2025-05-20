import { CartToggleButtonWrapper, CartToggleButtonText } from '../styles/CartToggleButton';
import { IMAGE_PATH } from '../constants/imagePath';
import { ERROR_MSG } from '../constants/errorMessage';
import { deleteCartItem, postCartItems } from '../api/cartItems';

type CartToggleButtonProps = {
  id: number;
  isInCart: boolean;
  cartId?: number;
  isNotCartCountMAX: boolean;
  setError: (value: boolean) => void;
};

export type CartToggleButtonWrapperProps = {
  isInCart: boolean;
};

type handleCartToggleButtonProps = {
  isInCart: boolean;
  productId: number;
  cartId?: number;
  isNotCartCountMAX: boolean;
  setError: (value: boolean) => void;
};

const handleCartToggleButton = async ({
  isInCart,
  productId,
  cartId,
  isNotCartCountMAX,
  setError,
}: handleCartToggleButtonProps) => {
  if (!isInCart) {
    if (!isNotCartCountMAX) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      throw new Error(ERROR_MSG.CART_LIMIT_EXCEEDED);
    }
    await postCartItems(productId);
  } else if (cartId !== undefined) {
    await deleteCartItem(cartId);
  }
};

const CartToggleButton = ({
  id,
  isInCart,
  cartId,
  isNotCartCountMAX,
  setError,
}: CartToggleButtonProps) => {
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
          setError,
        })
      }
    >
      <img src={imageSrc} alt="shopping_cart" />
      <CartToggleButtonText isInCart={isInCart}>{isInCart ? '빼기' : '담기'}</CartToggleButtonText>
    </CartToggleButtonWrapper>
  );
};

export default CartToggleButton;
