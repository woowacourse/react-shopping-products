import { useState } from "react";
import useProductsInfiniteQuery from "./useProductsInfiniteQuery";

export default function useProducts() {
  const { category, sort, handleCategory, handleSort } = useProductSelect();

  const {
    data,
    status,
    isFetching,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProductsInfiniteQuery(category, sort);

  return {
    data,
    isFetching,
    isFetchingNextPage,
    isPending,
    status,
    hasNextPage,
    fetchNextPage,
    handleCategory,
    handleSort,
  };
}

const useProductSelect = () => {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("asc");

  const handleCategory = (category: Category | "all") => {
    setCategory(category);
  };

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  return { category, sort, handleCategory, handleSort };
};
