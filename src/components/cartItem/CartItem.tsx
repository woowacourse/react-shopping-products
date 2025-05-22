import * as S from './CardItem.styles';
import CounterControl from '../common/counterControl/CounterControl';
import type { CartItemType } from '../../types/data';
import useCartCount from '../../hooks/useCartCount';

interface CartItemProps {
  cartItem: CartItemType;
  handleAddCartItems: (productId: number) => void;
  handleRemoveCartItems: (productId: number) => void;
  handleUpdateCartItems: (productId: number, quantity: number) => void;
}

const CartItem = ({
  cartItem,
  handleAddCartItems,
  handleRemoveCartItems,
  handleUpdateCartItems,
}: CartItemProps) => {
  const { handlePlusCount, handleMinusCount } = useCartCount({
    cartInCount: cartItem.quantity,
    product: cartItem.product,
    handleUpdateCartItems,
    handleAddCartItems,
    handleRemoveCartItems,
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
          handlePlusCount={handlePlusCount}
          handleMinusCount={handleMinusCount}
        />
      </S.CartItemInfoContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
