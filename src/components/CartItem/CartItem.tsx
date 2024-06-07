import QuantityStepper from '../QuantityStepper/QuantityStepper';
import useCartItems from '../../hooks/useCartItems/useCartItems';
import { Cart } from '../../types/Cart.type';
import * as S from './CartItem.style';

interface CartItemProps {
  cartItem: Cart;
}

function CartItem({ cartItem }: CartItemProps) {
  const { quantity, product } = cartItem;

  const { handleDeleteCartItem, handleUpdateCartItemQuantity } = useCartItems();

  return (
    <S.Layout>
      <S.Body>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemText>{product.name}</S.ItemText>
            <S.ItemPriceText>{product.price.toLocaleString()}원</S.ItemPriceText>
          </S.ItemInfoContainer>
          <QuantityStepper
            quantity={quantity}
            onMinusButtonClick={() => handleUpdateCartItemQuantity(product.id, quantity - 1)}
            onPlusButtonClick={() => handleUpdateCartItemQuantity(product.id, quantity + 1)}
          />
        </S.ItemContainer>
      </S.Body>
      <S.DeleteButton onClick={() => handleDeleteCartItem(product.id)}>삭제</S.DeleteButton>
    </S.Layout>
  );
}

export default CartItem;
