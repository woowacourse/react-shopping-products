import { useState, useMemo } from "react";
import { ResponseProduct } from "../api/types";
import getProductList from "../api/ProductListApi";
import { useDataFetch } from "./useDataFetch";

export const useProducts = () => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const productFetcher = useMemo(() => {
    return () => {
      return getProductList({ category, sort });
    };
  }, [category, sort]);

  const {
    data: productList,
    loading: productListLoading,
    error,
    refetch,
  } = useDataFetch<ResponseProduct[]>("products", productFetcher, {
    deps: [category, sort],
    retryCount: 2,
    retryDelay: 1000,
  });

  const productListErrorMessage = error || "";

  const handleProductErrorMessage = (message: string) => {
    if (message) {
      throw new Error(message);
    }
  };

  return {
    productList: productList || [],
    productListLoading,
    productListErrorMessage,
    category,
    sort,
    setCategory,
    setSort,
    setErrorMessage: handleProductErrorMessage,
    refetch,
  };
};
