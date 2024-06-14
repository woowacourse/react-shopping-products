import styled from "styled-components";

export const Container = styled.div`
  padding-top: 24px;
`;

export const CartItemWrapper = styled.div`
  max-height: 50vh;
  overflow: scroll;
`;

export const TotalAmountWrapper = styled.div`
  padding: 12px 0 24px;
  border-top: 1px solid ${({ theme }) => theme.COLOR["grey2"]};
`;

export const ImgWrapper = styled.div`
  text-align: center;
`;

export const Img = styled.img``;
