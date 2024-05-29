import { useError } from "../../context/errorContext";
import useProducts from "../../hooks/useProducts";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import { StyledProduct } from "./Product.styled";

export const Product = () => {
  const { isLoading } = useProducts();
  const { errorStatus } = useError();

  return (
    <StyledProduct>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !errorStatus && (
          <>
            <ProductHeader />
            <ProductList />
          </>
        )
      )}
    </StyledProduct>
  );
};
