import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import { useError } from "../context/errorContext";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
  error: Error | null;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { setErrorStatus } = useError();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_ENDPOINT);
        if (!response.ok) {
          setErrorStatus(response.status);
          throw new Error("에러 발생");
        }
        const data = await response.json();
        setProducts(data.content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setErrorStatus]);

  return { products, isLoading, error };
}
