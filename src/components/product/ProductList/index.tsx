import * as S from './style';

import APIErrorToast from '../../common/APIErrorToast';
import IntersectionArea from '../../common/IntersectionArea';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';
import { UseProductsResult } from '../../hooks/useProducts';
import ProductItem from '../ProductItem';

export default function ProductList({
  error,
  isLoading,
  products,
  fetchNextPage,
}: UseProductsResult) {
  const isEmptyProducts = products.length === 0;

  return (
    <S.Grid isEmpty={isEmptyProducts}>
      {error && <APIErrorToast errorMessage={error.message} />}

      {isEmptyProducts && !isLoading && (
        <S.EmptyProducts>해당하는 상품이 없습니다.</S.EmptyProducts>
      )}

      {products.map((product, idx) => {
        const isLastProductItem = idx + 1 !== products.length;
        return isLastProductItem ? (
          <ProductItem product={product} key={`${product.id}_${idx}`} />
        ) : (
          <IntersectionArea
            onImpression={fetchNextPage}
            key={`${product.id}_${idx}`}
          >
            <ProductItem product={product} />
          </IntersectionArea>
        );
      })}

      {isLoading && (
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      )}
    </S.Grid>
  );
}
