import { useEffect, useRef } from 'react';

import useProductList from '../../hooks/useProductList';
import ProductItem from '../ProductItem/ProductItem';
import { Category, Product, Sort } from '../../types/type';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../common/Spinner/Spinner';
import useCartItemList from '../../hooks/useCartItemList';
import { useToast } from '../../store/ToastProvider';

import * as S from './ProductItemList.style';

interface ProductItemListProp {
  category: Category;
  sort: Sort;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
  const {
    data: productListData,
    error: productListError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProductList({
    category,
    sort,
  });

  const { data: cartItemListData, error: cartItemListError } =
    useCartItemList();

  const { addToast } = useToast();

  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (productListError) {
      addToast(productListError.message);
    }
    if (cartItemListError) {
      addToast(cartItemListError.message);
    }
  }, [productListError, cartItemListError]);

  useEffect(() => {
    if (target.current === null) return;
    observe(target.current);

    if (productListData?.pages.length === 0 || !hasNextPage) {
      unobserve(target.current);
    }
  }, [productListData?.pages, , observe, unobserve, hasNextPage]);

  return (
    <>
      {isFetching && !productListData ? (
        <Spinner height="80vh" />
      ) : (
        <>
          <S.ProductList>
            {productListData?.pages.map((page) =>
              page.content.map((product: Product) => (
                <ProductItem
                  key={`${product.id}`}
                  product={product}
                  cartItemList={cartItemListData?.content ?? []}
                />
              )),
            )}
          </S.ProductList>
          <div ref={target} style={{ height: '1px' }} />
          {isFetchingNextPage && <Spinner height="fit-content" />}
        </>
      )}
    </>
  );
}

export default ProductItemList;
