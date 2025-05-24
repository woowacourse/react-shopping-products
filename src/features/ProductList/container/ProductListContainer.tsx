import { PropsWithChildren, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Loading } from '@/shared/components/Loading';
import { Text } from '@/shared/components/Text';
import { useData } from '@/shared/context/useData';
import { useScrollStatus } from '@/shared/hooks/useScrollStatus';

export const ProductListContainer = ({ children }: PropsWithChildren) => {
  const { productData } = useData();

  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollStatus(containerRef);
  // TODO : 간헐적으로 OverLay가 안보이는 현상 수정 필요
  return (
    <StyledOuterContainer>
      {productData?.isLoading ? (
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
      ) : productData.data?.length === 0 ? (
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
      ) : (
        <>
          <StyledGradientOverlay isScrolled={isScrolled} />
          <StyledProductListContainer ref={containerRef}>{children}</StyledProductListContainer>
        </>
      )}
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
