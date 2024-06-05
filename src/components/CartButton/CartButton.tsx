import Button from '@/components/common/Button/Button';
import { AddCart, MinusCart } from '@/assets/index';
import { ButtonImg } from './CartButton.style';
import useCartItem from '@/hooks/useCartItemHandler';
import QuantityPicker from '@/components/QuantityPicker/QuantityPicker';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ productId, initIsInCart }) => {
  const {
    isInCart,
    handleAddCartItem,
    handlePatchCartItem,
    handleRemoveCartItem,
  } = useCartItem({
    productId,
    initIsInCart,
  });

  if (isInCart) {
    return (
      <QuantityPicker
        handlePatchCartItem={handlePatchCartItem}
        handleRemoveCartItem={handleRemoveCartItem}
      />
    );
  }

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
