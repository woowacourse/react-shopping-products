import { useEffect, useRef, useState } from 'react';

import useFetchAddCart from '../hooks/useFetchAddCart';
import useFetchProducts from '../hooks/useFetchProducts';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Header from '../components/Header/Header';
import Dropdown from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ProductCard from '../components/ProductCard/ProductCard';
import { CartContext } from '../CartContext';
import { SortingParam } from '../types/sort';
import { DEFAULT_SORTING_PARAM } from '../constants/page';

import * as S from './Product.styled';

function Product() {
  const target = useRef(null);

  const fetchAddCartState = useFetchAddCart();
  const [sortings, setSortings] = useState<SortingParam[]>([
    DEFAULT_SORTING_PARAM,
  ]);
  const [filter, setFilter] = useState('');
  const {
    products,
    isError,
    isPending,
    isLast,
    fetchNextPage,
    page,
    resetPage,
  } = useFetchProducts(sortings, filter);

  const { observe, unobserve } = useIntersectionObserver(() => fetchNextPage());

  useEffect(() => {
    if (!target.current || isPending || isLast) return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [page, isPending, isLast]);

  return (
    <>
      <CartContext.Provider value={fetchAddCartState}>
        <Header badgeCount={fetchAddCartState.cartIdSet.size} />
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
      </CartContext.Provider>
    </>
  );
}

export default Product;
