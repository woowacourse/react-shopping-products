import { ICartItem } from "./../../api/cartItems";
import styled from "styled-components";

interface PriceInfoProps {
  cartItems: ICartItem[];
}

const PriceInfo = ({ cartItems }: PriceInfoProps) => {
  const totalPrice = cartItems.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity;
  }, 0);

  return (
    <S.Container>
      <S.PriceText>총 결제 금액</S.PriceText>
      <S.Price>{totalPrice.toLocaleString()}원</S.Price>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    padding: 0 0.7rem;
    margin-top: 1.8rem;
    margin-bottom: 1.2rem;
  `,
  PriceText: styled.h4`
    font-size: 1.6rem;
  `,
  Price: styled.h3`
    font-size: 2.4rem;
  `,
};

export default PriceInfo;
