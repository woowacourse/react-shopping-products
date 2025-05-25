import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CategoryOptionsKey,
  SortOptionsKey,
} from "../../../../shared/config/filter";
import { useAPI } from "../../../../shared/hooks/useAPI";
import { ProductsAPI } from "../../api/products";
import { Products } from "../types/response";

export interface UseProductsResult {
  products: Products | null;
  error: string | null;
  isLoading: boolean;

  category: CategoryOptionsKey;
  setCategory: (newCategory: CategoryOptionsKey) => void;

  sortOption: SortOptionsKey;
  setSortOption: (newSort: SortOptionsKey) => void;

  refetchProducts: () => void;
}

export const useProducts = (): UseProductsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category =
    (searchParams.get("category") as CategoryOptionsKey) || "전체";
  const sortOption =
    (searchParams.get("sort") as SortOptionsKey) || "낮은 가격 순";

  const setCategory = useCallback(
    (newCategory: CategoryOptionsKey) => {
      searchParams.set("category", newCategory);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const setSortOption = useCallback(
    (newSort: SortOptionsKey) => {
      searchParams.set("sort", newSort);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const fetcher = useCallback(
    () => ProductsAPI.get(category, sortOption),
    [category, sortOption]
  );

  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useAPI("products", fetcher);

  useEffect(() => {
    refetch();
  }, [category, sortOption, refetch]);

  return {
    products,
    error,
    isLoading,

    category,
    setCategory,

    sortOption,
    setSortOption,

    refetchProducts: refetch,
  };
};
