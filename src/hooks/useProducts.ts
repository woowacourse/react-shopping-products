import { useCallback } from "react";
import { ProductsAPI } from "../apis/products";
import { useProductFilter } from "./useProductFilter";
import { Products } from "../apis/types/products";
import { useData } from "../contexts/DataContext";

const useProducts = () => {
  const { selectedCategory, selectedSortOption } = useProductFilter();

  const fetcher = useCallback(() => {
    return ProductsAPI.get(selectedCategory, selectedSortOption);
  }, [selectedCategory, selectedSortOption]);

  const {
    data: products,
    isLoading,
    error: errorMessage,
    setError: setErrorMessage,
  } = useData<Products>({
    key: "products",
    fetcher,
  });

  return {
    products,
    isLoading,
    errorMessage,
    setErrorMessage,
  };
};

export default useProducts;
