import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { Product } from '../../types/fetch';
import ProductCard from './ProductCard/ProductCard';
import * as S from './ProductList.styled';

interface ProductListProps {
  products: Product[];
  page: number;
  isPending: boolean;
  isLast: boolean;
  isError: boolean;
  fetchNextPage: () => void;
}

const ProductList = ({ products, page, isPending, isLast, isError, fetchNextPage }: ProductListProps) => {
  const target = useRef(null);
  const { observe, unobserve } = useIntersectionObserver(() => fetchNextPage());

  useEffect(() => {
    if (!target.current || isPending || isLast || isError) return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [page, isPending, isLast]);

  return (
    <S.ProductListContainer>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
      <S.ObserverContainer ref={target} />
    </S.ProductListContainer>
  );
};

export default ProductList;
