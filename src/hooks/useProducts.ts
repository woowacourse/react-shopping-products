import { useEffect, useState } from "react";
import { ProductsAPI } from "../apis/products";
import { isErrorResponse } from "../utils/typeGuard";
import { useProductFilter } from "./useProductFilter";
import { Products } from "../apis/types/products";

const useProducts = () => {
  const [products, setProducts] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { selectedCategory, selectedSortOption } = useProductFilter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await ProductsAPI.get(
        selectedCategory,
        selectedSortOption
      );
      setIsLoading(false);

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setProducts(response as Products);
    })();
  }, [selectedCategory, selectedSortOption]);

  return {
    products,
    isLoading,
    errorMessage,
    setErrorMessage,
  };
};

export default useProducts;
