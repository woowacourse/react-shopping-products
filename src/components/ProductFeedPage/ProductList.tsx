import styled from "styled-components";
import { IntersectionDetector } from "@components/common/IntersectionDetector";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ProductItem from "@components/ProductFeedPage/ProductItem";
import ProductFilterBar from "@components/ProductFeedPage/ProductFilterBar";
import { useInfiniteProducts } from "@src/server/queries/useInfiniteProducts";

interface ProductListProps {
  onError: (error: Error) => void;
}

const ProductList = ({ onError }: ProductListProps) => {
  const { data, isLoading, fetchNextPage, updateCategoryFilter, updatePriceSort } =
    useInfiniteProducts(onError);

  return (
    <S.ItemContainer>
      <ProductFilterBar
        updateCategoryFilter={updateCategoryFilter}
        updatePriceSort={updatePriceSort}
      />
      {data.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {isLoading && <LoadingSpinner />}
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
