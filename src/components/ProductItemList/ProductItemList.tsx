import { useContext, useEffect, useRef } from 'react';

import { QuantityContext } from '../../store/QuantityContext';
import useProductList from '../../hooks/useProductList';
import useCartItemList from '../../hooks/useCartItemList';
import ProductItem from '../ProductItem/ProductItem';
import { Category, Sort } from '../../types/type';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../common/Spinner/Spinner';
import { ErrorContext } from '../../store/ErrorContext';

import * as S from './ProductItemList.style';

interface ProductItemListProp {
  category: Category;
  sort: Sort;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
  const {
    productList,
    productListError,
    productListLoading,
    page,
    fetchNextPage,
    isLastPage,
    setPage,
  } = useProductList({
    category,
    sort,
  });
  const { cartItemList, isInCart, toggleCartItem, cartItemListError } =
    useCartItemList();
  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  const errorContext = useContext(ErrorContext);
  const setError = errorContext ? errorContext.setError : () => {};

  useEffect(() => {
    setPage(0);
  }, [category, sort, setPage]);

  useEffect(() => {
    if (page === -1 || target.current === null) return;
    observe(target.current);

    const N = productList.length;

    if (N === 0 || isLastPage) {
      unobserve(target.current);
    }
  }, [productList, page, observe, unobserve, isLastPage]);
  const quantityContext = useContext(QuantityContext);
  const setQuantity = quantityContext ? quantityContext.setQuantity : () => {};
  setQuantity(cartItemList.length);

  if (productListError) {
    setError(productListError);
  }
  if (cartItemListError) {
    setError(cartItemListError);
  }

  return (
    <>
      <S.ProductList>
        {productList.map((product) => (
          <ProductItem
            key={`${product.id}`}
            product={product}
            isInCart={isInCart(product.id)}
            toggleCartItem={() => toggleCartItem(product)}
          />
        ))}
      </S.ProductList>
      <div ref={target} style={{ height: '1px' }} />
      {productListLoading && <Spinner />}
    </>
  );
}

export default ProductItemList;
