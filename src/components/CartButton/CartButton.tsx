import Button from '../common/Button/Button';
import { AddCart } from '../../asset';
import * as S from './CartButton.style';
import useCartItemHandler from '../../hooks/useCartItemHandler';
import { CartButtonProps } from './\bCardButton.type';
import { BUTTON_MESSAGE } from '../../constants/button';

const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const {
    isInCart,
    itemQuantity,
    handleAddCartItemQuantity,
    handleMinusCartItemQuantity,
    showCountButton,
  } = useCartItemHandler({
    productId,
  });
  return (
    <>
      {!isInCart ? (
        <Button isGray={isInCart} onClick={() => showCountButton()}>
          <S.ButtonImg src={AddCart} />
          <span>{BUTTON_MESSAGE.ADD}</span>
        </Button>
      ) : (
        <S.CardQuantityButtonContainer>
          <S.CountButton
            onClick={() => {
              handleMinusCartItemQuantity();
            }}
          >
            {BUTTON_MESSAGE.MINUS}
          </S.CountButton>

          <S.QuantityCount>{itemQuantity}</S.QuantityCount>
          <S.CountButton
            onClick={() => {
              handleAddCartItemQuantity();
            }}
          >
            {BUTTON_MESSAGE.PLUS}
          </S.CountButton>
        </S.CardQuantityButtonContainer>
      )}
    </>
  );
};

export default CartButton;
