import { useState, useEffect, useCallback, useRef } from "react";
import { getProducts } from "../api";

interface UseProductsResult {
  products: Product[];
  hasMore: boolean;
  loadMore: () => void;
  lastProductElementRef: (node: HTMLDivElement) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isMounted = useRef(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    if (isMounted.current) {
      const fetchProducts = async () => {
        try {
          const size = page === 1 ? 20 : 4;
          const responseData = await getProducts({ page, size });
          setProducts((prevProducts) => [
            ...prevProducts,
            ...responseData.content,
          ]);
          if (responseData.content.length < size) {
            setHasMore(false);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchProducts();
    } else {
      isMounted.current = true;
    }
  }, [page]);

  return {
    products,
    loadMore: () => setPage((prevPage) => prevPage + 1),
    hasMore,
    lastProductElementRef,
  };
}
