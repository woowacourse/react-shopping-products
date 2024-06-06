import styled from "styled-components";

import ProductItem from "@components/ProductListPage/ProductItem";
import ShopHeader from "@components/ProductListPage/ShopHeader";
import ProductFilterBar from "@components/ProductListPage/ProductFilterBar";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { IntersectionDetector } from "@components/common/IntersectionDetector";

import { useErrorToast } from "@contexts/errorToast/useErrorToast";
import { useInfiniteProducts } from "@server/useInfiniteProducts";

const ProductList = () => {
  const { showErrorToast } = useErrorToast();
  const handleError = () => {
    showErrorToast("상품을 로딩하는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  };

  const { data, isLoading, fetchNextPage, updateCategoryFilter, updatePriceSort } =
    useInfiniteProducts(handleError);

  return (
    <>
      <S.Container>
        <ShopHeader />
        <S.ShopBody>
          <S.Title>bpple 상품 목록</S.Title>
          <ProductFilterBar
            updateCategoryFilter={updateCategoryFilter}
            updatePriceSort={updatePriceSort}
          />
          <S.ItemContainer>
            {data.map((product) => (
              <ProductItem key={crypto.randomUUID()} productInfo={product} />
            ))}
            {isLoading && <LoadingSpinner />}
            <IntersectionDetector onIntersected={fetchNextPage} />
          </S.ItemContainer>
        </S.ShopBody>
      </S.Container>
    </>
  );
};

export default ProductList;

const S = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 10.4rem;
  `,

  ShopBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 2rem;
  `,

  Title: styled.h2`
    font-size: 2.4rem;
    font-weight: bold;
  `,

  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1 0 100%;
    gap: 2.6rem 1.6rem;
    margin-top: 1.1rem;
  `,
};
