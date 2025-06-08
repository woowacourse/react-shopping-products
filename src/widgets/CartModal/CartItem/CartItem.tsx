import { CartItemContent } from "../../../apis/types/response";
import { useCartItems } from "../../../features/cart/hooks/useCartItems";
import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import * as S from "./CartItem.styles";

const CartItem = ({
  id: cartId,
  quantity: currentQuantity,
  product: { id: productId, name, price, imageUrl, quantity: maxQuantity },
}: CartItemContent) => {
  const { increaseItemQuantity, decreaseItemQuantity, deleteProductInCart } =
    useCartItems();

  return (
    <S.CartItem>
      <S.CartItemImage $url={imageUrl} />
      <S.CartItemWrapper>
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantitySelector
            quantity={currentQuantity}
            onIncrease={() => increaseItemQuantity(productId)}
            onDecrease={() => decreaseItemQuantity(productId)}
            increaseDisabled={currentQuantity >= maxQuantity}
          />
        </S.CartItemInfo>
        <S.DeleteButton onClick={() => deleteProductInCart(cartId)}>
          삭제
        </S.DeleteButton>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
