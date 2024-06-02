import { useEffect, useRef } from 'react';

import { Product } from '@/types/product.type';
import ProductItem from './ProductItem';
import styled from '@emotion/styled';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Props {
  products: Product[];
  page: number;
  getNextPage: () => void;
  hasNextPage: boolean;
}

const ProductList = ({ products, page, getNextPage, hasNextPage }: Props) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [observe, unobserve] = useIntersectionObserver(getNextPage);

  useEffect(() => {
    if (target.current) {
      observe(target.current);
    }

    if (page === 0) {
      const listContainer = document.getElementById('listContainer');
      if (listContainer) {
        listContainer.scrollTop = 0;
      }
    }

    return () => {
      if (target.current) {
        unobserve(target.current);
      }
    };
  }, [observe, unobserve, page]);

  return (
    <S.ListContainer id="listContainer">
      <S.GridContainer>
        {products.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))}
      </S.GridContainer>
      {hasNextPage && <S.ObserverContainer ref={target} />}
    </S.ListContainer>
  );
};

export default ProductList;

const S = {
  ListContainer: styled.div`
    width: 100%;
    height: calc(
      100vh - 223px
    ); // 전체 화면 높이에서 헤더, 드롭다운, 마진 등을 뺀 높이
    margin-top: 24px;
    overflow-y: auto;
  `,
  GridContainer: styled.div`
    min-height: calc(
      100vh - 223px
    ); // 전체 화면 높이에서 헤더, 드롭다운, 마진 등을 뺀 최소 높이
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    justify-items: center;
  `,
  ObserverContainer: styled.div`
    width: 100%;
    height: 1px;
    visibility: hidden;
  `,
};
