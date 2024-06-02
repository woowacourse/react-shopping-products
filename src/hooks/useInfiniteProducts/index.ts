import { Product, getProducts } from "@apis/products";
import { useInfiniteFetch } from "@hooks/useInfiniteFetch";
import { PRODUCT_QUERY_PARAMS } from "@src/apis/__constants__/productQueryParams";
import type { Category, PriceSort } from "products";

interface UseInfiniteProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  updateCategoryFilter: (category: Category) => void;
  updatePriceSort: (sort: PriceSort) => void;
}

export const useInfiniteProducts = (): UseInfiniteProductsReturn => {
  const { data, isLoading, error, refetchByQueryUpdate, fetchNextPage } =
    useInfiniteFetch<Product>(getProducts);

  const updateCategoryFilter = (category: Category) => {
    refetchByQueryUpdate(PRODUCT_QUERY_PARAMS.category, category);
  };

  const updatePriceSort = (sort: PriceSort) => {
    refetchByQueryUpdate(PRODUCT_QUERY_PARAMS.sort, sort);
  };

  return {
    products: data,
    isLoading,
    error,
    fetchNextPage,
    updateCategoryFilter,
    updatePriceSort,
  };
};
