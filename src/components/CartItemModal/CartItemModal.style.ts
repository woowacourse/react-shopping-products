import styled from "styled-components";

export const EmptyCart = styled.div`
  min-height: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

export const CartItemList = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  gap: 24px;
  row-gap: 24px;
`;
