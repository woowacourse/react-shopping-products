import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import {
  ProductResponse,
  ProductWithQuantityResponse,
} from "../types/response";

import { useProductQuery } from "../hooks/useProductQuery";
import { OrderByOptionType } from "../types/categoryOption";
import { ProductWithQuantity } from "../types/product";

interface ProductContextType {
  productsData: ProductWithQuantity[] | undefined;
  productFetchLoading: boolean;
  productFetchError: Error | null;
  fetchProducts: () => Promise<void>;
  orderBy: OrderByOptionType | null;
  setOrderBy: (orderBy: OrderByOptionType) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orderBy, setOrderBy] = useState<OrderByOptionType>("낮은 가격순");
  const productQuery = useProductQuery(orderBy);

  const fetchOptions = useMemo(() => ({}), []);

  const {
    data: products,
    isLoading: productFetchLoading,
    error: productFetchError,
    fetcher: fetchProducts,
  } = useFetch<ProductWithQuantityResponse>(productQuery, fetchOptions, false);

  const value = useMemo(
    () => ({
      productsData: products?.content,
      productFetchLoading,
      productFetchError,
      fetchProducts,
      orderBy,
      setOrderBy,
    }),
    [
      products?.content,
      productFetchLoading,
      productFetchError,
      fetchProducts,
      orderBy,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const productContext = useContext(ProductContext);
  if (productContext === undefined) {
    throw new Error(
      "useProductContext는 프로바이더 안쪽에 위치를 해야 합니다."
    );
  }
  return productContext;
};
