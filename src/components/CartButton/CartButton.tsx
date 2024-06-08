import Button from '../common/Button/Button';
import { AddCart } from '../../asset';
import {
  ButtonImg,
  CardQuantityButtonContainer,
  CountButton,
  QuantityCount,
} from './CartButton.style';
import useCartItemHandler from '../../hooks/useCartItemHandler';
import { CartButtonProps } from './\bCardButton.type';

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
          <ButtonImg src={AddCart} />
          <span>{'담기'}</span>
        </Button>
      ) : (
        <CardQuantityButtonContainer>
          <CountButton
            onClick={() => {
              handleMinusCartItemQuantity();
            }}
          >
            -
          </CountButton>

          <QuantityCount>{itemQuantity}</QuantityCount>
          <CountButton
            onClick={() => {
              handleAddCartItemQuantity();
            }}
          >
            +
          </CountButton>
        </CardQuantityButtonContainer>
      )}
    </>
  );
};

export default CartButton;
