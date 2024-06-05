import { useCallback, useRef } from "react";
import { useError } from "../../context/errorContext";
import useProducts from "../../hooks/useProducts";
import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import { StyledProduct } from "./Product.styled";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import useCartItems from "../../hooks/useCartItems";

export const Product = () => {
  const { products, isLastPage, fetchNextPage, categoryState, sortOptionState } = useProducts();
  const { isLoading } = useCartItems();
  const { errorMessage } = useError();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return <LoadingSpinner />;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLastPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLastPage, isLoading, fetchNextPage]
  );

  return (
    <StyledProduct>
      {!errorMessage && (
        <>
          <ProductHeader categoryState={categoryState} sortOptionState={sortOptionState} />
          <ProductList
            products={products}
            isLoading={isLoading}
            lastProductElementRef={lastProductElementRef}
          />
        </>
      )}
    </StyledProduct>
  );
};
