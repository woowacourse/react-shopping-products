import { CartAddButtonWrapper, CartAddButtonText } from '../../styles/CartAddButton';
import { IMAGE_PATH } from '../../constants/imagePath';
import { ERROR_MSG } from '../../constants/errorMessage';
import { useError } from '../../context/ErrorContext';
import { MAX_CART_COUNT } from '../../constants/magicNumber';
import { useFetchCartItems } from '../../hooks/useFetchCartItems';

type CartAddButtonProps = {
  id: number;
};

const CartAddButton = ({ id }: CartAddButtonProps) => {
  const { setErrorMessage } = useError();
  const { data: cartProductsIds, addToCart } = useFetchCartItems();

  const handleCartAddButton = async () => {
    try {
      if (cartProductsIds.length >= MAX_CART_COUNT) {
        setErrorMessage(ERROR_MSG.CART_LIMIT_EXCEEDED);
        return;
      }
      await addToCart(id);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  };

  return (
    <CartAddButtonWrapper onClick={handleCartAddButton}>
      <img src={IMAGE_PATH.SHOPPING_CART_ADD} alt="shopping_cart" />
      <CartAddButtonText>담기</CartAddButtonText>
    </CartAddButtonWrapper>
  );
};

export default CartAddButton;
