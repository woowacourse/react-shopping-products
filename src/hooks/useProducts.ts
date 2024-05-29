import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import { PAGE } from "../constants/page";
import { useError } from "../context/errorContext";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
  error: Error | null;
  page: number;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { setErrorStatus } = useError();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const limit = page === PAGE.FIRST_PAGE ? PAGE.FIRST_PAGE_LIMIT : PAGE.OTHER_PAGE_LIMIT;
        const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`);
        if (!response.ok) {
          setErrorStatus(response.status);
          throw new Error("에러 발생");
        }
        const data = await response.json();
        setProducts((prevProducts) => [...prevProducts, ...data.content]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setErrorStatus, page]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { products, isLoading, error, page, fetchNextPage };
}
