import Button from '../common/Button/Button';
import { AddCart, MinusCart } from '../../asset';
import { ButtonImg } from './CartButton.style';
import useCartItem from '../../hooks/useCartItemHandler';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ productId, initIsInCart }) => {
  const { isInCart, handleAddCartItem, handleRemoveCartItem } = useCartItem({
    productId,
    initIsInCart,
  });

  return (
    <Button
      isGray={isInCart}
      onClick={isInCart ? handleRemoveCartItem : handleAddCartItem}
    >
      <ButtonImg src={isInCart ? MinusCart : AddCart} />
      <span>{isInCart ? '빼기' : '담기'}</span>
    </Button>
  );
};

export default CartButton;
