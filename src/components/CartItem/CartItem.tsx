import { useEffect } from "react";

import useToasts from "../../hooks/useToasts";
import useRemoveCartItem from "../../hooks/cart-items/useRemoveCartItem";
import usePatchCartItemQuantity from "../../hooks/cart-items/usePatchCartItemQuantity";

import Stepper from "../Stepper/Stepper";

import { CartItem } from "../../types/cartItem";

import * as Styled from "./CartItem.style";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { addToast } = useToasts();
  const {
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    error: itemQuantityPatchError,
  } = usePatchCartItemQuantity();
  const { handleRemoveCartItem, error: itemRemoveError } = useRemoveCartItem();

  useEffect(() => {
    if (itemQuantityPatchError instanceof Error) {
      addToast(itemQuantityPatchError.message);
    }
    if (itemRemoveError instanceof Error) {
      addToast(itemRemoveError.message);
    }
  }, [itemQuantityPatchError, itemRemoveError, addToast]);

  return (
    <>
      <Styled.BorderLine />
      <Styled.CartItemBox>
        <Styled.CartItemImage $imageUrl={item.product.imageUrl} />
        <Styled.CartItemContentBox>
          <Styled.CartItemInfoBox>
            <h2>{item.product.name}</h2>
            {item.product.price.toLocaleString("ko-KR")}원
            <Stepper
              value={item.quantity}
              onDecrease={() => handleDecreaseQuantity(item.id, item.quantity)}
              onIncrease={() => handleIncreaseQuantity(item.id, item.quantity)}
            />
          </Styled.CartItemInfoBox>
          <Styled.DeleteButton onClick={() => handleRemoveCartItem(item.id)}>
            삭제
          </Styled.DeleteButton>
        </Styled.CartItemContentBox>
      </Styled.CartItemBox>
    </>
  );
}
