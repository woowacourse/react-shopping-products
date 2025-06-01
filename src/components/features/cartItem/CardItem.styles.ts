import styled from '@emotion/styled';

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);
  padding: 8px 0;
`;

export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const CartItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
  width: 100%;
`;

export const CartItemName = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const CartItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;
