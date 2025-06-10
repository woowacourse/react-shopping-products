import { CartItem as CartItemType } from "../../../apis/types/response";
import { useCart } from "../../../features/cart/hooks/useCart";
import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import * as S from "./CartItem.styles";

const CartItem = ({
  id: cartId,
  quantity: currentQuantity,
  product: { id: productId, name, price, imageUrl, quantity: maxQuantity },
}: CartItemType) => {
  const { product } = useCart();

  return (
    <S.CartItem>
      <S.CartItemImage $url={imageUrl} />
      <S.CartItemWrapper>
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantitySelector
            quantity={currentQuantity}
            onIncrease={() => product.quantity.increase(productId)}
            onDecrease={() => product.quantity.decrease(productId)}
            increaseDisabled={currentQuantity >= maxQuantity}
          />
        </S.CartItemInfo>
        <S.DeleteButton onClick={() => product.delete(cartId)}>
          삭제
        </S.DeleteButton>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
