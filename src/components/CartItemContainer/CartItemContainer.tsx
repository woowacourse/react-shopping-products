import QuantityContainer from "../QuantityContainer/QuantityContainer";
import * as S from "./CartItemContainer.style";

import type { CartItem } from "../../interfaces/CartItem";
interface CartItemProps {
  item: CartItem;
  onRemoveItem: (cartItemId: number) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
}

function CartItemContainer({
  item,
  onRemoveItem,
  onUpdateQuantity,
}: CartItemProps) {
  const { product } = item;

  const renderCartItemQuantity = (cartItemExists: CartItem) => {
    return (
      <QuantityContainer
        quantity={item.quantity.toString()}
        onMinusButtonClick={() =>
          onUpdateQuantity(cartItemExists.id, cartItemExists.quantity - 1)
        }
        onPlusButtonClick={() =>
          onUpdateQuantity(cartItemExists.id, cartItemExists.quantity + 1)
        }
      />
    );
  };

  return (
    <S.Layout>
      <S.Body>
        <S.DeleteButton onClick={() => onRemoveItem(item.id)}>
          삭제
        </S.DeleteButton>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemNameText>{product.name}</S.ItemNameText>
            <S.ItemPriceText>
              {product.price.toLocaleString()}원
            </S.ItemPriceText>
          </S.ItemInfoContainer>
          {renderCartItemQuantity(item)}
        </S.ItemContainer>
      </S.Body>
    </S.Layout>
  );
}

export default CartItemContainer;
