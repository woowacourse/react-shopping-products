import { useEffect, useRef, useState } from 'react';

import {
  useFetchCartItems,
  useFetchProducts,
  useIntersectionObserver,
} from '../hooks/index';
import Header from '../components/Header/Header';
import Dropdown from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ProductCard from '../components/ProductCard/ProductCard';
import { SortingParam } from '../types/sort';
import { DEFAULT_SORTING_PARAM } from '../constants/page';
import CartProvider from '../context/CartProvider';

import * as S from './Product.styled';

function Product() {
  const target = useRef(null);
  const [sortings, setSortings] = useState<SortingParam[]>([
    DEFAULT_SORTING_PARAM,
  ]);
  const [filter, setFilter] = useState('');

  const {
    data: products,
    isError,
    isLoading,
    isLast,
    fetchNextPage,
    resetPage,
  } = useFetchProducts(sortings, filter);
  const { data: cartItems } = useFetchCartItems();

  const { observe, unobserve } = useIntersectionObserver(() => fetchNextPage());

  useEffect(() => {
    if (!target.current || isLoading || isError || isLast) return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [isLoading, isError, isLast]);

  return (
    <>
      <CartProvider>
        <Header badgeCount={cartItems.length} />
        {isError && <ErrorMessage />}
        <S.ProductContentWrapper>
          <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
          <Dropdown
            setSortings={setSortings}
            setFilter={setFilter}
            resetPage={resetPage}
          />

          <S.ProductListContainer>
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
            <S.ObserverContainer ref={target} />
          </S.ProductListContainer>
        </S.ProductContentWrapper>
      </CartProvider>
    </>
  );
}

export default Product;
