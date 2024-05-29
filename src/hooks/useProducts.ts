import { useState, useEffect, useCallback, useRef } from "react";
import { getProducts } from "../api";
import { useError } from "./useError";

interface UseProductsResult {
  products: Product[];
  hasMore: boolean;
  loadMore: () => void;
  lastProductElementRef: (node: HTMLDivElement) => void;
  handleCategory: (category: Category | "all") => void;
  handleSort: (sort: Sort) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isMounted = useRef(false);
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("asc");
  const { showError } = useError();

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
          const size = page === 0 ? 20 : 4;
          const responseData = await getProducts({
            category: category === "all" ? undefined : category,
            sort,
            page,
            size,
          });
          setProducts((prevProducts) => [
            ...prevProducts,
            ...responseData.content,
          ]);

          if (responseData.content.length < size) {
            setHasMore(false);
          }
        } catch (error) {
          if (error instanceof Error) {
            showError(error.message);
          }
        }
      };

      fetchProducts();
    } else {
      isMounted.current = true;
    }
  }, [page, category, sort, showError]);

  const handleCategory = (category: Category | "all") => {
    setProducts([]);
    setCategory(category);
    setPage(0);
  };

  const handleSort = (sort: Sort) => {
    setProducts([]);
    setSort(sort);
    setPage(0);
  };

  return {
    products,
    loadMore: () => setPage((prevPage) => prevPage + 1),
    hasMore,
    lastProductElementRef,
    handleCategory,
    handleSort,
  };
}
