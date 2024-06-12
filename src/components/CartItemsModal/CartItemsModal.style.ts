import styled from '@emotion/styled';

export const CartItemListContainer = styled.ul`
  height: 300px;
  overflow-y: auto;
`;

export const TotalPriceContainer = styled.div`
border-top: ${({ theme }) => ` 1px solid ${theme.colors.border};`}
  padding: 10px;
  width: 100%;
  box-size: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p:first-of-type {
    font-size: 16px;
    font-weight: 700;
  }

  & > p:nth-of-type(2) {
    font-size: 24px;
    font-weight: 700;
  }
`;
