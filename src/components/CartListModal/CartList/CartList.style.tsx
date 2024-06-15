import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TotalPriceText = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const TotalPriceMoney = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 34.75px;
`;
