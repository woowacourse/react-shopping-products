import ProductCardSkeleton from './ProductCardSkeleton';

import { PAGE_SIZE } from '@/constants/config';

const ProductCardListSkeleton = () => {
  return (
    <>
      {Array.from({ length: PAGE_SIZE.nextItemSize }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default ProductCardListSkeleton;
