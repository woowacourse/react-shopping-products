import { FlexColumn, FlexSpaceBetween } from '@/style/common.style';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

const ProductItemSkeleton = () => {
  return (
    <S.ItemCard>
      <S.SkeletonImg />
      <S.InfoWrapper>
        <S.SkeletonText />
        <S.SkeletonText width="60%" />
        <S.SkeletonButton />
      </S.InfoWrapper>
    </S.ItemCard>
  );
};

export default ProductItemSkeleton;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const S = {
  ItemCard: styled.div`
    ${FlexColumn}
    width: 175px;
    height: 225px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
  `,
  SkeletonImg: styled.div`
    width: 175px;
    height: 110px;
    border-radius: 8px 8px 0 0;
    background: ${theme.color.lightGrey};
    background-image: linear-gradient(
      90deg,
      ${theme.color.lightGrey} 25%,
      ${theme.color.grey} 50%,
      ${theme.color.lightGrey} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `,
  InfoWrapper: styled.div`
    ${FlexColumn}
    ${FlexSpaceBetween}
    height: calc(225px - 110px);
    margin-top: 7px;
    padding: 8px;
  `,
  SkeletonText: styled.div<{ width?: string }>`
    width: ${({ width }) => width || '100%'};
    height: 20px;
    background: ${theme.color.lightGrey};
    border-radius: 4px;
    background-image: linear-gradient(
      90deg,
      ${theme.color.lightGrey} 25%,
      ${theme.color.grey} 50%,
      ${theme.color.lightGrey} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `,
  SkeletonButton: styled.div`
    width: 50px;
    height: 30px;
    background: ${theme.color.lightGrey};
    border-radius: 4px;
    align-self: flex-end;
    background-image: linear-gradient(
      90deg,
      ${theme.color.lightGrey} 25%,
      ${theme.color.grey} 50%,
      ${theme.color.lightGrey} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `,
};
