import { useEffect, useState } from "react";
import { Products } from "../types/products";
import { ProductsAPI } from "../apis/products";
import { isErrorResponse } from "../utils/typeGuard";
import { CategoryOptionsKey, SortOptionsKey } from "../constants";

const useProducts = (
  category: CategoryOptionsKey,
  sortOption: SortOptionsKey
) => {
  const [products, setProducts] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await ProductsAPI.get(category, sortOption);
      setIsLoading(false);

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setProducts(response as Products);
    })();
  }, [category, sortOption]);

  return {
    products,
    isLoading,
    errorMessage,
    setErrorMessage,
  };
};

export default useProducts;
