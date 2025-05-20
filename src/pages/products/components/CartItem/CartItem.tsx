import { GetCartItemsResponse } from "@/types";
import * as S from "./CartItem.styles";
import { deleteCartItems } from "@/apis/cartItem";
import { AddMinusButton } from "@/components";

interface CartItemProps {
  cartItem: GetCartItemsResponse["content"][number];
}

export default function CartItem({ cartItem }: CartItemProps) {
  const {
    product: { imageUrl, price, name, id },
    quantity,
  } = cartItem;

  const handleDeleteCartItem = () => {
    deleteCartItems({ cartItemId: cartItem.id });
  };

  return (
    <S.CartItemWrapper>
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemInfoWrapper>
        <S.CartItemName>{name}</S.CartItemName>
        <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
        <AddMinusButton
          quantity={quantity}
          onAddButtonClick={() => console.log(id)}
          onMinusButtonClick={() => console.log(id)}
        />
      </S.CartItemInfoWrapper>
    </S.CartItemWrapper>
  );
}
