import { PropsWithChildren, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Loading } from '@/shared/components/Loading';
import { Text } from '@/shared/components/Text';
import { useData } from '@/shared/context/useData';
import { useScrollStatus } from '@/shared/hooks/useScrollStatus';
type ProductContainerWrapperProps = {
  content?: React.ReactNode;
  isLoading: boolean;
  isScrolled: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
} & PropsWithChildren;

const ProductContainerWrapper = ({
  content,
  isLoading,
  isScrolled,
  containerRef,
  children,
}: ProductContainerWrapperProps) => {
  return (
    <StyledOuterContainer isLoading={isLoading}>
      {content}
      <StyledGradientOverlay isScrolled={isScrolled} />
      <StyledProductListContainer ref={containerRef}>{children}</StyledProductListContainer>
    </StyledOuterContainer>
  );
};

const LoadingContent = () => (
  <Flex
    direction="column"
    gap="0px"
    justifyContent="center"
    alignItems="center"
    css={css`
      width: 100%;
      height: 600px;
    `}
  >
    <Loading size="xl" />
  </Flex>
);

const EmptyContent = () => (
  <Text
    type="Body"
    css={css`
      padding: 20px;
      justify-self: center;
      align-self: center;
    `}
  >
    데이터가 존재하지 않습니다.
  </Text>
);

export const ProductListContainer = ({ children }: PropsWithChildren) => {
  const { productData } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollStatus(containerRef);

  const commonProps = {
    children,
    isLoading: productData.isLoading,
    isScrolled,
    containerRef,
  };

  if (productData.isLoading) {
    return <ProductContainerWrapper {...commonProps} content={<LoadingContent />} />;
  }

  if (productData.data?.length === 0) {
    return <ProductContainerWrapper {...commonProps} content={<EmptyContent />} />;
  }
  return <ProductContainerWrapper {...commonProps} />;
};

const StyledOuterContainer = styled.div<{ isLoading: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 670px;
  padding-bottom: 20px;

  & > * {
    transition:
      opacity 0.4s ease-in-out,
      transform 0.4s ease-in-out;
    opacity: ${({ isLoading }) => (isLoading ? 1 : 1)};
    transform: ${({ isLoading }) => (isLoading ? 'translateY(0)' : 'translateY(0)')};
  }
`;

const StyledGradientOverlay = styled.div<{ isScrolled: boolean }>`
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 25px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent);
  opacity: ${({ isScrolled }) => (isScrolled ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  z-index: 10;
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
