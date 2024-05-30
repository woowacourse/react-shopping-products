import { useState, useEffect } from "react";
import { getProducts } from "../api";
import { useError } from "./useError";
import usePagination from "./usePagination";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  lastProductElementRef: (node: HTMLDivElement) => void;
  handleCategory: (category: Category | "all") => void;
  handleSort: (sort: Sort) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("asc");
  const { showError } = useError();
  const [loading, setLoading] = useState<boolean>(true);

  const { page, lastElementRef, resetPage } = usePagination(hasMore);

  useEffect(() => {
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
        setLoading(false);

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
  }, [page, category, sort, showError]);

  const handleCategory = (category: Category | "all") => {
    setProducts([]);
    setCategory(category);
    resetPage();
  };

  const handleSort = (sort: Sort) => {
    setProducts([]);
    setSort(sort);
    resetPage();
  };

  return {
    products,
    loading,
    lastProductElementRef: lastElementRef,
    handleCategory,
    handleSort,
  };
}
