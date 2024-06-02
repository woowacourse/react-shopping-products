import { useError } from "../../context/errorContext";
import useProducts from "../../hooks/useProducts";
import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import { StyledProduct } from "./Product.styled";

export const Product = () => {
  const { products, isLoading, isLastPage, fetchNextPage, categoryState, sortOptionState } =
    useProducts();
  const { errorMessage } = useError();

  return (
    <StyledProduct>
      {!errorMessage && (
        <>
          <ProductHeader categoryState={categoryState} sortOptionState={sortOptionState} />

          <ProductList
            products={products}
            isLoading={isLoading}
            isLastPage={isLastPage}
            fetchNextPage={fetchNextPage}
          />
        </>
      )}
    </StyledProduct>
  );
};
