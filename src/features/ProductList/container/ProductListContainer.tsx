import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export const ProductListContainer = ({ children }: PropsWithChildren) => {
  return <StyledProductListContainer>{children}</StyledProductListContainer>;
};

const StyledProductListContainer = styled.div`
  max-height: 670px;
  height: 100%;
  overflow-y: auto;
  padding: 0 25px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  box-sizing: border-box;
`;
