import { useContext, useEffect, useRef } from 'react';

import useProductList from '../../hooks/useFetchProductList';
import ProductItem from '../ProductItem/ProductItem';
import { Category, Product, Sort } from '../../types/type';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../common/Spinner/Spinner';

import * as S from './ProductItemList.style';
interface ProductItemListProp {
  category: Category;
  sort: Sort;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProductList({
    category,
    sort,
  });

  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (target.current === null) return;
    observe(target.current);

    if (data?.pages.length === 0 || !hasNextPage) {
      unobserve(target.current);
    }
  }, [data?.pages, observe, unobserve, hasNextPage]);

  return (
    <>
      <S.ProductList>
        {data?.pages.map((page) =>
          page.content.map((product: Product) => (
            <ProductItem key={`${product.id}`} product={product} />
          )),
        )}
      </S.ProductList>
      <div ref={target} style={{ height: '1px' }} />
      {isFetchingNextPage && <Spinner />}
    </>
  );
}

export default ProductItemList;
