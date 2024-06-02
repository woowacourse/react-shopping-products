import { Product, getProducts } from "../../api/products";
import { Category, SortOption } from "../../types/products";
import { useInfiniteFetch } from "../useInfiniteFetch";

interface UseInfiniteProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  updateCategoryFilter: (category: Category) => void;
  updatePriceSort: (sort: SortOption) => void;
}

export const useInfiniteProducts = (): UseInfiniteProductsReturn => {
  const { data, isLoading, error, refetchByQueryUpdate, fetchNextPage } =
    useInfiniteFetch<Product>(getProducts);

  const updateCategoryFilter = (category: Category) => {
    refetchByQueryUpdate("category", category);
  };

  const updatePriceSort = (sort: SortOption) => {
    refetchByQueryUpdate("sort", `price,${sort}`);
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
