import { useEffect } from "react";

import useFetchProducts from "../../hooks/products/useFetchProducts";
import useToasts from "../../hooks/useToasts";

import InfiniteScrollContainer from "../InfiniteScrollContainer/InfiniteScrollContainer";
import ProductItem from "../ProductItem/ProductItem";
import ProductItemSkeletonList from "../ProductItem/skeleton/ProductItemSkeletonList";

import { PRODUCTS_SIZE, ProductOption } from "../../constants/products";

import * as Styled from "./ProductItemContainer.style";

interface ProductItemContainerProps {
  options: ProductOption;
}

export default function ProductItemContainer({ options }: ProductItemContainerProps) {
  const { addToast } = useToasts();
  const { products, fetchNextPage, isLoading, error } = useFetchProducts(options);

  useEffect(() => {
    if (error instanceof Error) {
      addToast(error.message);
    }
  }, [error, addToast]);

  return (
    <InfiniteScrollContainer
      isObserverActive={!isLoading && !error}
      onIntersect={fetchNextPage}
    >
      <Styled.Container>
        {products.map((product, index) => (
          <ProductItem
            key={`${product.id}-${index}`}
            product={product}
          />
        ))}
      </Styled.Container>
      {isLoading && <ProductItemSkeletonList length={PRODUCTS_SIZE.perRequest} />}
    </InfiniteScrollContainer>
  );
}
