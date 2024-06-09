import { CATEGORY_LIST, Category } from "../constants/category";
import { SORT_LIST, Sort } from "../constants/sort";
import { useCallback, useState } from "react";

import useInfiniteFetchProducts from "./useInfiniteFetchProducts";

const useProducts = () => {
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [sort, setSort] = useState(SORT_LIST[0]);

  const { data, isLoading, error, fetchNextPage } = useInfiniteFetchProducts({
    category,
    sort,
  });

  const handleCategoryChange = useCallback(
    (newCategory: Category) => {
      if (newCategory !== category) {
        setCategory(newCategory);
      }
    },
    [category]
  );

  const handleSortChange = useCallback(
    (newSort: Sort) => {
      if (newSort !== sort) {
        setSort(newSort);
      }
    },
    [sort]
  );

  return {
    products: data?.pages,
    isLoading,
    error,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  };
};

export default useProducts;
