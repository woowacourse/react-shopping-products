import { InfiniteData } from '@tanstack/react-query';

import * as Styled from './ProductCardList.styled';
import CartToggleButton from '../cartToggleButton/CartToggleButton';
import Spinner from '../common/spinner/Spinner';
import ProductCard from '../productCard/ProductCard';
import ProductCardListSkeleton from '../productCardSkeleton/ProductCardListSkeleton';

import { ProductResponse } from '@/types/product';

interface ProductCardListProp {
  data: InfiniteData<ProductResponse, unknown> | undefined;
  isPending: boolean;
  isFetching: boolean;
}

// 데이터를 처음 불러올 때(isPending) : Spinner
// 추가 데이터를 불러올 때(isFetching) : Skeleton
const ProductCardList = ({ data, isPending, isFetching }: ProductCardListProp) => {
  return (
    <>
      <Styled.ProductCardListWrapper>
        {data &&
          data.pages.map((page) =>
            page.content.map((product, idx) => (
              <div key={`${product.id}_${idx}`}>
                <ProductCard imageUrl={product.imageUrl} name={product.name} price={product.price}>
                  <CartToggleButton product={product} />
                </ProductCard>
              </div>
            )),
          )}
        {isFetching && <ProductCardListSkeleton />}
      </Styled.ProductCardListWrapper>
      {isPending && <Spinner />}
    </>
  );
};

export default ProductCardList;
