import { useCartItems } from "../../../entities/cartItem/model/providers/useCartItems";
import { CartItemContent } from "../../../entities/cartItem/model/types/response";
import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import * as S from "./CartItem.styles";

const CartItem = ({
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
        <S.DeleteButton onClick={() => deleteProductInCart(productId)}>
          삭제
        </S.DeleteButton>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
