import { PropsWithChildren } from 'react';
import styled from '@emotion/styled/macro';

export const ProductListContainer = ({ children }: PropsWithChildren) => {
  return <StyledProductListContainer>{children}</StyledProductListContainer>;
};

const StyledProductListContainer = styled.div`
  max-height: 700px;
  overflow-y: auto;
  padding: 0 25px;
`;
