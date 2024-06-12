import { useProducts } from "../../hooks";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import * as S from "./ProductSection.styled";

export const ProductSection = () => {
  const {
    isLoading,
    products,
    isLastPage,
    fetchNextPage,
    resetPage,
    setCategory,
    setSortOption,
    selectedCategory,
    selectedSort,
  } = useProducts();

  return (
    <S.StyledProductSection>
      <>
        <ProductHeader
          resetPage={resetPage}
          setCategory={setCategory}
          setSortOption={setSortOption}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
        />
        <ProductList
          products={products}
          isLoading={isLoading}
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
        />
      </>

      {isLoading && <LoadingSpinner />}
    </S.StyledProductSection>
  );
};
