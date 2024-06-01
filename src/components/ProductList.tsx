import { useEffect, useRef } from 'react';

import LoadingImg from '@/assets/loading.gif';
import { Product } from '@/types/product.type';
import ProductItem from './ProductItem';
import styled from '@emotion/styled';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Props {
  isLoading: boolean;
  products: Product[];
  page: number;
  getNextPage: () => void;
  hasNextPage: boolean;
}

const ProductList = ({
  isLoading,
  products,
  page,
  getNextPage,
  hasNextPage,
}: Props) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [observe, unobserve] = useIntersectionObserver(getNextPage);

  const listContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (target.current) {
      observe(target.current);
    }

    if (page === 0 && listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }

    return () => {
      if (target.current) {
        unobserve(target.current);
      }
    };
  }, [observe, unobserve, page]);

  return (
    <S.ListContainer ref={listContainerRef}>
      <S.GridContainer>
        {products.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))}
      </S.GridContainer>

      {isLoading && <S.LoadingImg src={LoadingImg} alt="loading" />}
      {hasNextPage && <S.ObserverContainer ref={target} />}
    </S.ListContainer>
  );
};

export default ProductList;

const S = {
  ListContainer: styled.div`
    width: 100%;
    height: calc(100vh - 230px); // 헤더 및 카테고리 드롭다운
    margin-top: 24px;
    z-index: -1;
    overflow-y: auto;
  `,
  GridContainer: styled.div`
    min-height: calc(100vh - 230px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
    gap: 20px;
    justify-items: center;
  `,
  ObserverContainer: styled.div`
    width: 100%;
    height: 20px;
  `,
  LoadingImg: styled.img`
    width: 100%;
    height: 50px;
  `,
};
