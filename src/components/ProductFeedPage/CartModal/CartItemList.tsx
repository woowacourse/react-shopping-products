import styled from "styled-components";
import CartItem from "./CartItem";
import { useCartItems } from "@src/server/queries/useCartItems";
import LoadingSpinner from "@src/components/common/LoadingSpinner";

const CartItemList = () => {
  const { data, isLoading } = useCartItems();

  return (
    <S.Container>
      <LoadingSpinner isLoading={isLoading} />
      {data.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </S.Container>
  );
};
export default CartItemList;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
