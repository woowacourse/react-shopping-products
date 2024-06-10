import styled from "styled-components";

export const CartItemContainer = styled.ul`
  max-height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TotalAmountContainer = styled.div`
  margin-top: 24px;
  border-top: 1px solid #e5e5e5;
  padding-top: 12px;
`;

export const AmountItem = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

export const Amount = styled.p`
  font-size: 24px;
  font-weight: 700;
  text-align: right;
  color: #000000;
`;
