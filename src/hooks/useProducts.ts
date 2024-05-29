import { useEffect, useState } from "react";

import { Product } from "../types/products";
import { getProducts } from "../api/products";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const size = page === 0 ? 20 : 4;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const { content, last } = await getProducts(page, size);

        setProducts((prevProducts) => [...prevProducts, ...content]);
        setIsLastPage(last);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const fetchNextPage = () => {
    if (isLastPage) {
      return;
    }

    if (page === 0) {
      setPage((page) => page + 4);
      return;
    }

    setPage((page) => page + 1);
  };

  return {
    products,
    page,
    isLoading,
    error,
    fetchNextPage,
  };
};

export default useProducts;
