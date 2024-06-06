import styled from "styled-components";
import CartItemList from "./CartItemList";
import { formatToKRW } from "@src/utils/formatToKRW";
import { useCartAmount } from "@src/server/hooks/useCartAmount";

const CartModalContent = () => {
  const { cartAmount } = useCartAmount();

  return (
    <S.Container>
      <S.Header>장바구니</S.Header>
      <CartItemList />
      <S.TotalPrice>
        <S.PriceLabel>총 상품 금액</S.PriceLabel>
        <S.Price>{formatToKRW(cartAmount)}</S.Price>
      </S.TotalPrice>
    </S.Container>
  );
};

export default CartModalContent;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,

  Header: styled.header`
    font-size: 1.8rem;
    font-weight: 700;
  `,

  TotalPrice: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  PriceLabel: styled.span`
    font-size: 1.6rem;
    font-weight: 700;
  `,

  Price: styled.span`
    font-size: 2.4rem;
    font-weight: 700;
  `,
};
