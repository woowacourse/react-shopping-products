import { useEffect, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useProductsQuery from '@/hooks/queries/product/useProductsQuery';
import ProductItem from './ProductItem';
import { ProductFilterOptions } from '@/types/product.type';
import styled from '@emotion/styled';
import useToast from '@/hooks/_common/useToast';
import Toast from './Toast';

const ProductList = ({ sort, category }: ProductFilterOptions) => {
  const target = useRef<HTMLDivElement | null>(null);
  const {
    products,
    isLoading,
    isError,
    errorMessage,
    hasNextPage,
    fetchNextPage,
  } = useProductsQuery({ sort, category });

  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);
  const showToast = useToast({ isError });

  useEffect(() => {
    if (target.current) {
      observe(target.current);
    }

    if (products.length === 0) {
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
  }, [observe, unobserve, products.length]);

  return (
    <>
      <S.ListContainer id="listContainer">
        <S.GridContainer>
          {products.map((product) => (
            <ProductItem key={product.id} item={product} />
          ))}
        </S.GridContainer>
        {hasNextPage && <S.ObserverContainer ref={target} />}
      </S.ListContainer>
      {showToast && <Toast message={errorMessage as string} />}
    </>
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
    row-gap: 16px;
    justify-items: center;
  `,
  ObserverContainer: styled.div`
    width: 100%;
    height: 1px;
    visibility: hidden;
  `,
};
