import { PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';

import { useScrollStatus } from '@/shared/hooks/useScrollStatus';

export const ProductListContainer = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollStatus(containerRef);

  return (
    <StyledOuterContainer>
      <StyledGradientOverlay isScrolled={isScrolled} />
      <StyledProductListContainer ref={containerRef}>{children}</StyledProductListContainer>
    </StyledOuterContainer>
  );
};

const StyledOuterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 670px;
  padding-bottom: 20px;
`;

const StyledGradientOverlay = styled.div<{ isScrolled: boolean }>`
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 25px;
  padding: 0 -20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent);
  opacity: ${({ isScrolled }) => (isScrolled ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

const StyledProductListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  box-sizing: border-box;
`;
