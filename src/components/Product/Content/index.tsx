import ProductList from "./List";
import * as S from "./ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import { Suspense, useMemo, useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";
import { getProducts } from "@/apis/products/getProducts";
import ErrorBoundary from "@/components/ErrorBoundary";
import Fallback from "@/components/Fallback";
import { FILTER_OPTIONS, SORT_OPTIONS } from "./ProductContent.constant";

function ProductContent() {
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FILTER_OPTIONS[0]
  );
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0]);
  const productResource = useMemo(
    () => getProducts({ filterOption, sortOption }),
    [filterOption, sortOption]
  );

  const handleFilterSelect = (option: FilterOption) => {
    setFilterOption(option);
  };

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <FilterSortControl
        filterOption={filterOption}
        sortOption={sortOption}
        onFilterChange={handleFilterSelect}
        onSortChange={handleSortSelect}
      />
      <Suspense
        fallback={
          <Fallback
            type="loading"
            message="상품 목록을 가져오는 중 입니다..."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <Fallback
              type="error"
              message="상품 목록을 가져오는 중 에러가 발생하였습니다."
            />
          }
        >
          <ProductList resource={productResource} />
        </ErrorBoundary>
      </Suspense>
    </S.Container>
  );
}

export default ProductContent;
