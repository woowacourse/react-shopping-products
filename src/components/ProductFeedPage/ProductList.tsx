import styled from "styled-components";
import { IntersectionDetector } from "@components/common/IntersectionDetector";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ProductItem from "@components/ProductFeedPage/ProductItem";
import ProductFilterBar from "@components/ProductFeedPage/ProductFilterBar";
import { useErrorToast } from "@src/contexts/errorToast/useErrorToast";
import { useInfiniteProducts } from "@src/server/queries/useInfiniteProducts";

const ProductList = () => {
  const { showErrorToast } = useErrorToast();
  const handleError = () => {
    showErrorToast("상품을 로딩하는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  };

  const { data, isLoading, fetchNextPage, updateCategoryFilter, updatePriceSort } =
    useInfiniteProducts(handleError);

  return (
    <S.ItemContainer>
      <ProductFilterBar
        updateCategoryFilter={updateCategoryFilter}
        updatePriceSort={updatePriceSort}
      />
      {data.map((product) => (
        <ProductItem key={crypto.randomUUID()} product={product} />
      ))}
      <LoadingSpinner isLoading={isLoading} />
      <IntersectionDetector onIntersected={fetchNextPage} />
    </S.ItemContainer>
  );
};

export default ProductList;

const S = {
  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1 0 100%;
    gap: 2.6rem 1.6rem;
    margin-top: 1.1rem;
  `,
};
