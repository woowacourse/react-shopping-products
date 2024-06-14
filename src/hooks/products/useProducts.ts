import { CATEGORY_LIST, Category } from "../../constants/category";
import { SORT_LIST, Sort } from "../../constants/sort";

import useInfiniteFetchProducts from "./useInfiniteFetchProducts";
import { useState } from "react";

const useProducts = () => {
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [sort, setSort] = useState(SORT_LIST[0]);

  const { data, isLoading, error, fetchNextPage } = useInfiniteFetchProducts({
    category,
    sort,
  });

  const handleCategoryChange = (newCategory: Category) => {
    if (newCategory !== category) {
      setCategory(newCategory);
    }
  };

  const handleSortChange = (newSort: Sort) => {
    if (newSort !== sort) {
      setSort(newSort);
    }
  };

  return {
    products: data?.pages ?? [],
    isLoading,
    error,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  };
};

export default useProducts;
