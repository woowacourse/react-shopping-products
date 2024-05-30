import { useError } from "../../context/errorContext";
import useProducts from "../../hooks/useProducts";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import { StyledProduct } from "./Product.styled";

export const Product = () => {
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
  const { errorStatus } = useError();

  return (
    <StyledProduct>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !errorStatus && (
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
        )
      )}
    </StyledProduct>
  );
};
