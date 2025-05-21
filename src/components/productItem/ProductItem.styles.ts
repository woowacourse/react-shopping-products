import styled from '@emotion/styled';

export const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 182px;
  width: 100%;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-white);
`;

export const ProductItemImage = styled.img`
  position: relative;
  height: 50%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const ProductItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 8px;
  align-items: end;
`;

export const ProductItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 6px;
  width: 100%;
  height: 40px;
`;

export const ProductItemTitle = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  width: 100%;
  text-align: start;
`;

export const ProductItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  width: 100%;
`;

export const CartIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
`;

export const CartAddIcon = styled.img`
  width: 16px;
`;

export const OutOfStockText = styled.h2`
  font-size: var(--font-size-placeholder);
  font-weight: var(--font-weight-placeholder);
  width: 100%;
  color: var(--color-red);
`;
