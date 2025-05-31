import * as S from './CardItem.styles';
import CounterControl from '../@common/counterControl/CounterControl';
import type { CartItemType } from '../../types/data';
import useCartCount from '../../hooks/useCartCount';
import { handleImageError } from '../../util/handleImageError';

interface CartItemProps {
  cartItem: CartItemType;
  onAddCartItem: (productId: number) => void;
  onRemoveCartItem: (productId: number) => void;
  onUpdateCartItem: (productId: number, quantity: number) => void;
}

const CartItem = ({
  cartItem,
  onAddCartItem,
  onRemoveCartItem,
  onUpdateCartItem,
}: CartItemProps) => {
  const { handlePlusCount, handleMinusCount } = useCartCount({
    cartInCount: cartItem.quantity,
    product: cartItem.product,
    onUpdateCartItem,
    onAddCartItem,
    onRemoveCartItem,
  });

  return (
    <S.CartItemContainer>
      <S.CartItemImage src={cartItem.product.imageUrl} onError={handleImageError} />
      <S.CartItemInfoContainer>
        <S.CartItemName>{cartItem.product.name}</S.CartItemName>
        <S.CartItemPrice>{cartItem.product.price}</S.CartItemPrice>
        <CounterControl
          count={cartItem.quantity}
          maxCount={cartItem.product.quantity}
          onPlusCount={handlePlusCount}
          onMinusCount={handleMinusCount}
        />
      </S.CartItemInfoContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
