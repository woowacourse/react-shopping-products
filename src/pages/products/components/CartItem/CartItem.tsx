import { Button, PlusMinusButton } from "@/components";
import { GetCartItemsResponse } from "@/types";
import { css } from "@emotion/react";
import { useCartItem } from "../../hooks";
import * as S from "./CartItem.styles";

interface CartItemProps {
  cartItem: GetCartItemsResponse["content"][number];
  refetchCartItems: () => Promise<void>;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const { increaseCartItem, decreaseCartItem, deleteCartItem } = useCartItem();

  return (
    <S.ProductCardCartItemWrapper>
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemInfoWrapper>
        <S.CartItemName>{name}</S.CartItemName>
        <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
        <PlusMinusButton
          quantity={quantity}
          onAddButtonClick={() => increaseCartItem(cartItem.product.id)}
          onMinusButtonClick={() => decreaseCartItem(cartItem.product.id)}
        />
        <Button
          onClick={async () => {
            await deleteCartItem(cartItem.id);
          }}
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
    </S.ProductCardCartItemWrapper>
  );
}
