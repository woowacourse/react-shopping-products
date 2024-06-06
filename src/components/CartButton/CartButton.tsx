import Button from '../common/Button/Button';
import { AddCart, MinusCart } from '../../asset';
import { ButtonImg } from './CartButton.style';
import useCartItemHandler from '../../hooks/useCartItemHandler';
import { CartButtonProps } from './\bCardButton.type';

const CartButton: React.FC<CartButtonProps> = ({
  itemQuantity,
  productId,
  initIsInCart,
}) => {
  const { isInCart, handleAddCartItem, handleRemoveCartItem } =
    useCartItemHandler({
      productId,
      initIsInCart,
    });

  return (
    <Button
      isGray={isInCart}
      onClick={
        isInCart
          ? () => handleRemoveCartItem()
          : () => handleAddCartItem(itemQuantity)
      }
    >
      <ButtonImg src={isInCart ? MinusCart : AddCart} />
      <span>{isInCart ? '빼기' : '담기'}</span>
    </Button>
  );
};

export default CartButton;
