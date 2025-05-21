import { GetCartItemsResponse } from "@/types";
import * as S from "./CartItem.styles";
import { AddMinusButton, Button } from "@/components";
import { css } from "@emotion/react";
import { CartItemApi } from "@/apis";

interface CartItemProps {
  cartItem: GetCartItemsResponse["content"][number];
  refetchCartItems: () => Promise<void>;
}

export default function CartItem({ cartItem, refetchCartItems }: CartItemProps) {
  const {
    product: { imageUrl, price, name, id },
    quantity,
  } = cartItem;

  const handleDecreaseCartItem = async () => {
    await CartItemApi.patchCartItems({ cartItemId: cartItem.id, quantity: quantity - 1 });
    await refetchCartItems();
  };

  const handleIncreaseCartItem = async () => {
    await CartItemApi.patchCartItems({ cartItemId: cartItem.id, quantity: quantity + 1 });
    await refetchCartItems();
  };

  const handleDeleteCartItem = async () => {
    await CartItemApi.deleteCartItems({ cartItemId: cartItem.id });
    await refetchCartItems();
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
          onAddButtonClick={handleIncreaseCartItem}
          onMinusButtonClick={handleDecreaseCartItem}
        />
        <Button
          onClick={handleDeleteCartItem}
          css={css`
            position: absolute;
            right: 0;
            top: 8px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 4px 8px;
          `}
        >
          삭제
        </Button>
      </S.CartItemInfoWrapper>
    </S.CartItemWrapper>
  );
}
