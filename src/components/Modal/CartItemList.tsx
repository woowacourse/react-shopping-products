import styled from "styled-components";
import CartItem from "./CartItem";

const CartItemList = () => {
  return (
    <S.Container>
      <S.Hr />
      <CartItem />
      <S.Hr />
      <CartItem />
      <S.Hr />
      <CartItem />
      <S.Hr />
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
    width: 95%;
    height: 0.1rem;
    margin-bottom: 1.2rem;
    border: 0.1rem solid #0000001a;
  `,
};
