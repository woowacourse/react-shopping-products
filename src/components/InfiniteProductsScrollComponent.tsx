import { useEffect, useRef } from "react";

import { HandleCartItems } from "../hooks/useToggleCartItem";
import { Product } from "../types/products";
import ProductCard from "./product/ProductCard";

interface InfiniteProductsScrollComponentProps {
  productObject: {
    products: Product[];
    isLoading: boolean;
    error: unknown;
    fetchNextPage: () => void;
  };
  handleCartItems: HandleCartItems;
}

const InfiniteProductsScrollComponent = ({
  productObject,
  handleCartItems,
}: InfiniteProductsScrollComponentProps) => {
  const { products, isLoading, error, fetchNextPage } = productObject;
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, fetchNextPage]);

  return (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={`${index}${product.id}`}
          product={product}
          handleCartItems={handleCartItems}
        />
      ))}
      {error! && <div>Error loading products!</div>}
      <div ref={loaderRef}>{isLoading && "Loading more products..."}</div>
    </>
  );
};

export default InfiniteProductsScrollComponent;
