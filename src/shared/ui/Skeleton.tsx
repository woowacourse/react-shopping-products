import ProductCardSkeleton from '../../features/products/ui/ProductCardSkeleton';
import * as S from './Skeleton.styles';

export default function Skeleton() {
  return (
    <div>
      <S.NavbarSkeleton>
        <S.LogoSkeleton />
        <S.CartSkeleton />
      </S.NavbarSkeleton>

      <S.SkeletonWrapper>
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </S.SkeletonWrapper>
    </div>
  );
}
