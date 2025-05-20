import { CartToggleButtonWrapper, CartToggleButtonText } from '../styles/CartToggleButton';
import { IMAGE_PATH } from '../constants/imagePath';
import { ERROR_MSG } from '../constants/errorMessage';
import { useError } from '../context/ErrorContext';
import { MAX_CART_COUNT } from '../constants/magicNumber';
import { CartProductIds } from '../hooks/useFetchCartItems';

type CartToggleButtonProps = {
  id: number;
  cartProductsIds: CartProductIds[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
};

export type CartToggleButtonWrapperProps = {
  isInCart: boolean;
};

const CartToggleButton = ({
  id,
  cartProductsIds,
  addToCart,
  removeFromCart,
}: CartToggleButtonProps) => {
  const { setErrorMessage } = useError();

  const isInCart = cartProductsIds.some((item) => item.productId === id);
  const cartId = cartProductsIds.find((item) => item.productId === id)?.cartId;

  const imageSrc = isInCart ? IMAGE_PATH.SHOPPING_CART_REMOVE : IMAGE_PATH.SHOPPING_CART_ADD;

  const handleCartToggleButton = async () => {
    try {
      if (!isInCart) {
        if (cartProductsIds.length >= MAX_CART_COUNT) {
          setErrorMessage(ERROR_MSG.CART_LIMIT_EXCEEDED);
          return;
        }
        await addToCart(id);
      } else if (cartId !== undefined) {
        await removeFromCart(cartId);
      }
    } catch (error) {
      console.error('장바구니 업데이트 실패:', error);
    }
  };

  return (
    <CartToggleButtonWrapper isInCart={isInCart} onClick={handleCartToggleButton}>
      <img src={imageSrc} alt="shopping_cart" />
      <CartToggleButtonText isInCart={isInCart}>{isInCart ? '빼기' : '담기'}</CartToggleButtonText>
    </CartToggleButtonWrapper>
  );
};

export default CartToggleButton;
