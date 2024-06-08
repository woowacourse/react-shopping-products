import ProductItemSkeleton from "./ProductItemSkeleton";

import * as Styled from "./ProductItemSkeleton.style";

interface ProductItemSkeletonListProps {
  length: number;
}

export default function ProductItemSkeletonList({ length }: ProductItemSkeletonListProps) {
  return (
    <Styled.ProductItemSkeletonContainer>
      {Array.from({ length }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </Styled.ProductItemSkeletonContainer>
  );
}
