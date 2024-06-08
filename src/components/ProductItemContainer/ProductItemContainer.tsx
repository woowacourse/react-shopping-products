import useFetchProducts from "../../hooks/products/useFetchProducts";

import InfiniteScrollContainer from "../InfiniteScrollContainer/InfiniteScrollContainer";
import ProductItem from "../ProductItem/ProductItem";
import ProductItemSkeletonList from "../ProductItem/skeleton/ProductItemSkeletonList";

import { PRODUCTS_SIZE, ProductOption } from "../../constants/products";

import * as Styled from "./ProductItemContainer.style";

interface ProductItemContainerProps {
  options: ProductOption;
}

export default function ProductItemContainer({ options }: ProductItemContainerProps) {
  const { products, fetchNextPage, isLoading, isError } = useFetchProducts(options);

  return (
    <InfiniteScrollContainer
      isObserverActive={!isLoading && !isError}
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
