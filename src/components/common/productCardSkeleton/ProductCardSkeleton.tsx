import * as Styled from './ProductCardSkeleton.styled';

const ProductCardSkeleton = () => {
  return (
    <Styled.SkeletonCard>
      <Styled.SkeletonImg />
      <Styled.SkeletonBody>
        <Styled.SkeletonInfo>
          <Styled.SkeletonText />
          <Styled.SkeletonText />
        </Styled.SkeletonInfo>
        <Styled.SkeletonText />
      </Styled.SkeletonBody>
    </Styled.SkeletonCard>
  );
};

export default ProductCardSkeleton;
