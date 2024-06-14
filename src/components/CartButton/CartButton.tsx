import Button from '../common/Button/Button';
import { AddCart } from '../../asset';
import * as S from './CartButton.style';
import useCartItemHandler from '../../hooks/useCartItemHandler';
import { CartButtonProps } from './\bCardButton.type';
import { BUTTON_MESSAGE } from '../../constants/button';
import { useCartItem } from '../../hooks/useCartItem';

const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const { cartItems } = useCartItem(false);

  const cartItem = cartItems.find((item) => item.product.id === productId);
  const isInCart = !!cartItem;
  const itemQuantity = cartItem ? cartItem.quantity : 0;
  const { handleCartItemQuantity, showCountButton } = useCartItemHandler({
    productId,
  });
  return (
    <>
      {isInCart ? (
        <S.CardQuantityButtonContainer>
          <S.CountButton
            onClick={() => {
              handleCartItemQuantity(cartItem.id, cartItem.quantity - 1);
            }}
          >
            {BUTTON_MESSAGE.MINUS}
          </S.CountButton>

          <S.QuantityCount>{itemQuantity}</S.QuantityCount>
          <S.CountButton
            onClick={() => {
              handleCartItemQuantity(cartItem.id, cartItem.quantity + 1);
            }}
          >
            {BUTTON_MESSAGE.PLUS}
          </S.CountButton>
        </S.CardQuantityButtonContainer>
      ) : (
        <Button isGray={isInCart} onClick={() => showCountButton()}>
          <S.ButtonImg src={AddCart} />
          <span>{BUTTON_MESSAGE.ADD}</span>
        </Button>
      )}
    </>
  );
};

export default CartButton;
