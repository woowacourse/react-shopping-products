import { Product, getProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { SortOption } from "../../types/sortOption";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "../../constants/products";

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  resetPage: () => void;
  setCategoryFilter: (category: string) => void;
  setPriceSort: (sort: SortOption) => void;
}

const INITIAL_PAGE_SIZE = 20;
const PAGE_SIZE = 4;

export default function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string>(CATEGORY_OPTIONS.all);
  const [priceSort, setPriceSort] = useState<SortOption>(SORT_OPTIONS.asc);

  const currentPage = page === 0 ? 0 : page + PAGE_SIZE;
  const currentPageSize = page === 0 ? INITIAL_PAGE_SIZE : PAGE_SIZE;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data, isLastPage } = await getProducts(
          currentPage,
          currentPageSize,
          categoryFilter,
          priceSort
        );
        setProducts([...products, ...data]);
        setIsLastPage(isLastPage);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [page, categoryFilter, priceSort]);

  const fetchNextPage = () => {
    if (!isLastPage && !isLoading && !error) {
      setCategoryFilter(categoryFilter);
      setPriceSort(priceSort);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const resetPage = () => {
    setProducts([]);
    setPage(0);
  };

  return { products, isLoading, error, fetchNextPage, resetPage, setCategoryFilter, setPriceSort };
}
