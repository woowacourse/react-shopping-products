import { useState, useMemo } from "react";
import { ResponseProduct } from "../api/types";
import getProductList from "../api/productListApi";
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
  } = useDataFetch<ResponseProduct[]>("products", productFetcher, {
    deps: [category, sort],
  });

  const productListErrorMessage = error || "";

  return {
    productList: productList || [],
    productListLoading,
    productListErrorMessage,
    category,
    sort,
    setCategory,
    setSort,
  };
};
