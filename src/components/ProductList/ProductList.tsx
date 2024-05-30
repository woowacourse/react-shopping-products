import React, { useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './ProductList.styled';
import { Product } from '../../types/fetch';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface ProductListProps {
  products: Product[];
  page: number;
  isError: boolean;
  isPending: boolean;
  isLast: boolean;
  fetchNextPage: () => void;
}

function ProductList({
  products,
  page,
  isError,
  isPending,
  isLast,
  fetchNextPage,
}: ProductListProps) {
  const target = useRef(null);
  const { observe, unobserve, disconnect } = useIntersectionObserver(() =>
    fetchNextPage(),
  );

  useEffect(() => {
    if (!target.current || isPending || isLast) return;

    observe(target.current);

    return () => {
      if (target.current) {
        unobserve(target.current);
      }
    };
  }, [page, isPending, isLast]);

  return (
    <S.ProductListContainer>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} />;
      })}
      <S.ObserverContainer ref={target} />
    </S.ProductListContainer>
  );
}

export default ProductList;
