import * as S from './ProductCardSkeleton.styles';

function ProductCardSkeleton() {
  return (
    <S.SkeletonWrapper>
      <S.ImageSkeleton />
      <S.TextSkeleton width='80%' />
      <S.TextSkeleton width='50%' />
      <S.ButtonSkeleton />
    </S.SkeletonWrapper>
  );
}

export default ProductCardSkeleton;
