import { useCallback, useRef } from "react";
import useProducts from "../../hooks/useProducts";
import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

export const ProductList = () => {
  const { products, fetchNextPage, isLoading, isLastPage } = useProducts();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLastPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isLastPage, fetchNextPage]
  );

  return (
    <StyledProductList>
      {products.map((product, index) => (
        <div ref={products.length === index + 1 ? lastProductElementRef : null} key={product.id}>
          <ProductItem imageUrl={product.imageUrl} name={product.name} price={product.price} />
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </StyledProductList>
  );
};
