import { useState } from 'react';
import { addCartItem, deleteCartItem } from '../../api';
import Button from '../common/Button/Button';
import { useCart } from '../../context/ShoppingCartCountContext';
import { useToast } from '../../hooks/useToast';
import { AddCart, MinusCart } from '../../asset';
import { ButtonImg } from './CartButton.style';

interface CartButtonProps {
  itemId: number;
  initIsInCart: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ itemId, initIsInCart }) => {
  const [isInCart, setIsInCart] = useState(initIsInCart);
  const { setCounts } = useCart();
  const { createToast } = useToast();

  const handleAddCartItem = async () => {
    try {
      setCounts((prev) => prev + 1);
      await addCartItem(itemId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => Math.max(0, prev - 1));
      }
    }

    setIsInCart((prev) => !prev);
  };

  const handleRemoveCartItem = async () => {
    try {
      setCounts((prev) => Math.max(0, prev - 1));
      await deleteCartItem(itemId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => prev + 1);
      }
    }

    setIsInCart((prev) => !prev);
  };

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
