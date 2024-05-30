import { useEffect, useRef } from "react";

import { ERROR_MESSAGE } from "../constants/message";
import { HandleCartItems } from "../hooks/useToggleCartItem";
import LoadingDots from "./LoadingDots";
import { Product } from "../types/products";
import ProductCard from "./product/ProductCard";
import styled from "@emotion/styled";

interface InfiniteProductsScrollComponentProps {
  productObject: {
    products: Product[];
    isLoading: boolean;
    error: unknown;
    fetchNextPage: () => void;
  };
  handleCartItems: HandleCartItems;
}

const S = {
  FallbackContainer: styled.div`
    width: calc(183px * 2 + 16px);
    margin: 16px 0;
  `,
};

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
      <S.FallbackContainer>
        {error! && <div>{ERROR_MESSAGE.getProducts}</div>}
        <div ref={loaderRef}>{isLoading && <LoadingDots />}</div>
      </S.FallbackContainer>
    </>
  );
};

export default InfiniteProductsScrollComponent;
