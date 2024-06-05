import { useCallback, useRef } from "react";
import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

interface ProductListProps {
  products: ProductProps[];
  isLoading: boolean;
  fetchNextPage: () => void;
  isLastPage: boolean;
}

export const ProductList = ({
  products,
  isLoading,
  isLastPage,
  fetchNextPage,
}: ProductListProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
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
        <div ref={index === products.length - 1 ? lastProductElementRef : null} key={product.id}>
          <ProductItem
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </StyledProductList>
  );
};
