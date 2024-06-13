import { useState } from "react";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import * as S from "./ProductItemSection.style";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import ProductItemList from "../ProductItemList/ProductItemList";
import ErrorBoundary from "../Error/ErrorBoundary";
import ErrorFallback from "../Error/ErrorFallback/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

function ProductItemSection() {
  const [category, setCategory] = useState<Category>("" as Category);
  const [sorting, setSorting] = useState<Sorting>(Sorting.PRICE_ASC);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as Category);
  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSorting(e.target.value as Sorting);
  return (
    <S.ProductSectionContainer>
      <DropdownContainer
        category={category}
        onChangeCategory={handleCategoryChange}
        sortingOption={sorting}
        onChangeSortingOption={handleSortingChange}
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallback={
              <ErrorFallback message="오류가 발생했습니다." onRetry={reset} />
            }
          >
            <ProductItemList category={category} sort={sorting} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </S.ProductSectionContainer>
  );
}

export default ProductItemSection;
