import { IMAGE_PATH } from '../../constants/imagePath';
import { useFetchCartItems } from '../../hooks/useFetchCartItems';
import * as S from '../../styles/CartUpdateButton';

type CartUpdateButtonProps = {
  id: number;
};

const CartUpdateButton = ({ id }: CartUpdateButtonProps) => {
  const { data: cartProductsIds, updateCartItem } = useFetchCartItems();

  const cartItem = cartProductsIds.find((item) => item.productId === id);
  const cartId = cartItem!.cartId;
  const quantity = cartItem!.quantity;

  const handleMinusButton = () => {
    updateCartItem(cartId, quantity - 1);
  };

  const handlePlusButton = () => {
    updateCartItem(cartId, quantity + 1);
  };

  return (
    <S.CartUpdateButtonWrapper>
      <S.CartUpdateButton onClick={handleMinusButton}>
        <img src={IMAGE_PATH.BUTTON_MINUS} alt="button-minus" />
      </S.CartUpdateButton>
      <S.CartUpdateButtonText>{quantity}</S.CartUpdateButtonText>
      <S.CartUpdateButton onClick={handlePlusButton}>
        <img src={IMAGE_PATH.BUTTON_PLUS} alt="button-plus" />
      </S.CartUpdateButton>
    </S.CartUpdateButtonWrapper>
  );
};

export default CartUpdateButton;
