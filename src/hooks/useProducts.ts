import { useState, useEffect } from "react";
import { getProducts } from "@api/index";
import { useQuery } from "@tanstack/react-query";
import { useError } from "./index";
import { RULE } from "@constants/rules";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  handleCategory: (category: Category) => void;
  handleSort: (sort: Sort) => void;
}

interface UseProductsProps {
  page: number;
  resetPage: () => void;
}

export default function useProducts({
  page,
  resetPage,
}: UseProductsProps): UseProductsResult {
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("asc");

  const { showError } = useError();

  const size = page === RULE.initialPage ? RULE.initialSize : RULE.nextSize;

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", sort, category],
    queryFn: () =>
      getProducts({
        category: category === "all" ? undefined : category,
        sort,
        page,
        size,
      }),
  });

  useEffect(() => {
    if (error instanceof Error) {
      showError(error.message);
    }
  }, [showError]);

  const handleCategory = (category: Category) => {
    setCategory(category);
    resetState();
  };

  const handleSort = (sort: Sort) => {
    setSort(sort);
    resetState();
  };

  const resetState = () => {
    resetPage();
    setHasMore(true);
  };

  return {
    products: data!,
    loading: isLoading,
    hasMore,
    handleCategory,
    handleSort,
  };
}
