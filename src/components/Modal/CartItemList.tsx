import styled from "styled-components";
import CartItem from "./CartItem";
import React from "react";
import { ICartItem } from "../../api/cartItems";

interface CartItemListProps {
  cartItems: ICartItem[];
}

const CartItemList = ({ cartItems }: CartItemListProps) => {
  return (
    <S.Container>
      <S.Hr />
      {cartItems.map((cartItem) => (
        <React.Fragment key={cartItem.id}>
          <CartItem
            cartItemId={cartItem.id}
            imageUrl={cartItem.product.imageUrl}
            productName={cartItem.product.name}
            price={cartItem.product.price}
            quantity={cartItem.quantity}
          />
          <S.Hr />
        </React.Fragment>
      ))}
    </S.Container>
  );
};

export default CartItemList;

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    height: 17rem;
    overflow-y: scroll;
  `,
  Hr: styled.hr`
    width: 100%;
    height: 0.1rem;
    margin-bottom: 1.2rem;
    border: 0.1rem solid #0000001a;
  `,
};
