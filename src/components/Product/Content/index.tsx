import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/Fallback/ErrorFallback";
import LoadingFallback from "@/components/Fallback/LoadingFallback";
import useData from "@/hooks/useData";
import { ProductItemType } from "@/types/product";
import { getProducts } from "@/apis/products/getProducts";
import { useCallback, useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";

function ProductContent() {
  const [filterOption, setFilterOption] = useState<FilterOption>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("낮은 가격순");

  const fetchProducts = useCallback(() => {
    return getProducts({ filterOption, sortOption });
  }, [filterOption, sortOption]);

  const { data: productData, isLoading } = useData<ProductItemType[]>({
    fetchFn: fetchProducts,
    name: "productData",
  });

  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <FilterSortControl
        filterOption={filterOption}
        sortOption={sortOption}
        onFilterChange={setFilterOption}
        onSortChange={setSortOption}
      />
      {isLoading ? (
        <LoadingFallback message="상품 목록을 가져오는 중 입니다..." />
      ) : (
        <ErrorBoundary
          fallback={
            <ErrorFallback message="상품 목록을 가져오는 중 에러가 발생하였습니다." />
          }
        >
          <ProductList productItemList={productData} />
        </ErrorBoundary>
      )}
    </S.Container>
  );
}

export default ProductContent;
