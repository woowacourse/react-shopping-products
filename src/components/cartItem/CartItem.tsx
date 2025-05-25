import * as S from './CardItem.styles';
import CounterControl from '../common/counterControl/CounterControl';
import type { CartItemType } from '../../types/data';
import useCartCount from '../../hooks/useCartCount';

interface CartItemProps {
  cartItem: CartItemType;
  onAddCartItems: (productId: number) => void;
  onRemoveCartItems: (productId: number) => void;
  onUpdateCartItems: (productId: number, quantity: number) => void;
}

const CartItem = ({
  cartItem,
  onAddCartItems,
  onRemoveCartItems,
  onUpdateCartItems,
}: CartItemProps) => {
  const { handlePlusCount, handleMinusCount } = useCartCount({
    cartInCount: cartItem.quantity,
    product: cartItem.product,
    onUpdateCartItems,
    onAddCartItems,
    onRemoveCartItems,
  });

  return (
    <S.CartItemContainer>
      <S.CartItemImage src="./default-product.png" />
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
