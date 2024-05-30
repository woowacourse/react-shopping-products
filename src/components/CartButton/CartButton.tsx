import Button from '../common/Button/Button';
import { AddCart, MinusCart } from '../../asset';
import { ButtonImg } from './CartButton.style';
import useCartItem from '../../hooks/useCartItem';

interface CartButtonProps {
  itemId: number;
  initIsInCart: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ itemId, initIsInCart }) => {
  const { isInCart, handleAddCartItem, handleRemoveCartItem } = useCartItem({
    itemId,
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
