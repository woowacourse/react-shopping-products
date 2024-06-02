import { useContext, useEffect, useRef } from 'react';

import { QuantityContext } from '../../store/QuantityContext';
import useProductList from '../../hooks/useProductList';
import useCartItemList from '../../hooks/useCartItemList';
import ProductItem from '../ProductItem/ProductItem';
import { Category, Sort } from '../../types/type';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../common/Spinner/Spinner';

import * as S from './ProductItemList.style';

interface ProductItemListProp {
  category: Category;
  sort: Sort;
  onError: (error: string) => void;
}

function ProductItemList({ category, sort, onError }: ProductItemListProp) {
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
  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

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
    onError('상품 목록 조회 실패');
  }
  if (cartItemListError) {
    onError('장바구니 목록 조회 실패');
  }

  return (
    <>
      <S.ProductList>
        {productList.map((product, idx) => (
          <ProductItem
            key={`${idx}_${product.id}`}
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
