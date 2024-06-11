import styled from "styled-components";
import CartItem from "./CartItem";
import { useCartItems } from "@serverState/queries/useCartItems";
import LoadingSpinner from "@src/components/common/LoadingSpinner";

const CartItemList = () => {
  const { data, isLoading } = useCartItems();

  return (
    <S.Container>
      {data.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {isLoading && <LoadingSpinner />}
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
