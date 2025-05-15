import styled from '@emotion/styled';
import { fadeIn } from '../../animations/animations';

export const ProductListPageContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h2`
  width: 100%;
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProductItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 12px;
  animation: ${fadeIn} 0.8s ease;
`;
