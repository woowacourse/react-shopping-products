import ProductItemSkeleton from './SkeletonItem';
import styled from '@emotion/styled';

export const SkeletonList = ({ length }: { length: number }) => {
  return (
    <S.SkeletonWrapper>
      {Array.from({ length }).map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </S.SkeletonWrapper>
  );
};

const S = {
  SkeletonWrapper: styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 16px;
  `,
};
