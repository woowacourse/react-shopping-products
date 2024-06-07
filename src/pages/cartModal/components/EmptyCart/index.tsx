import emptyCart from "@/assets/emptycart.png";
import { flexCenter } from "@/styles/common";
import styled from "styled-components";

const CartEmpty = () => {
  return (
    <S.Wrapper>
      <S.EmptyImage src={emptyCart} />
      <div>장바구니가 비어있습니다.</div>
    </S.Wrapper>
  );
};

export default CartEmpty;

const Wrapper = styled.div`
  ${flexCenter}
  height:250px;
  flex-direction: column;
`;

const EmptyImage = styled.img`
  height: 180px;
`;

const S = {
  Wrapper,
  EmptyImage,
};
