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
    height: calc(100vh - 230px);
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
};
