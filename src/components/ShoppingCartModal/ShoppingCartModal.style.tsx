import styled from 'styled-components';

export const CartItemList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.light};
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 35px 0;
`;

export const PriceTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const PriceValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 20px 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;

  img {
    width: 150px;
  }

  p {
    line-height: 1.6;
  }
`;
