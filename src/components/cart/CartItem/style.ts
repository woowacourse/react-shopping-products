import styled from '@emotion/styled';

export const CartItemWrapper = styled.li`
  list-style: none;

  width: 100%;
  height: fit-content;

  padding: 8px 0;
  border-top: ${({ theme }) => `solid 1px ${theme.colors.semiBlack}`};

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const CartItemInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 23.17px;
  text-align: left;

  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const QuantityContainer = styled.div`
  margin-top: 8px;
`;
