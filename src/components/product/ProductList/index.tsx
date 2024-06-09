import ProductItem from '../ProductItem';
import APIErrorToast from '../../common/APIErrorToast';
import IntersectionArea from '../../common/IntersectionArea';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';

import { UseProductsResult } from '../../../hooks/useProducts';
import * as S from './style';

export default function ProductList({
  error,
  isLoading,
  products,
  fetchNextPage,
}: UseProductsResult) {
  const isEmptyProducts = products.length === 0;

  // 서버에 의미 없는 제품 정보가 들어가 있어 filter 후 컴포넌트 생성 (2024.06.09, 렛서)
  const filteredProducts = products.filter(
    (product) => product.name !== 'string'
  );

  return (
    <S.Grid isEmpty={isEmptyProducts}>
      {error && <APIErrorToast errorMessage={error.message} />}

      {isEmptyProducts && !isLoading && (
        <S.EmptyProducts>해당하는 상품이 없습니다.</S.EmptyProducts>
      )}

      {filteredProducts.map((product, idx) => {
        const isLastProductItem = idx + 1 !== filteredProducts.length;
        return isLastProductItem ? (
          <ProductItem product={product} key={`${product.id}_${idx}`} />
        ) : (
          <IntersectionArea
            onImpression={fetchNextPage}
            key={`${product.id}_${idx}`}
          >
            k
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
