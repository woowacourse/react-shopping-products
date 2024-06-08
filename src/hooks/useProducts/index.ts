import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";
import { PRODUCT_DEFAULT_CATEGORY, PRODUCT_DEFAULT_SORT } from "../../constants/mallData";
import { PRODUCT_CATEGORY_TYPE, PRODUCT_SORT_TYPE } from "../../types/mall";
import { useState } from "react";

const fetchProducts = async ({
  pageParam = 0,
  category,
  sort,
}: {
  pageParam: number;
  category: PRODUCT_CATEGORY_TYPE;
  sort: PRODUCT_SORT_TYPE;
}) => {
  const size = pageParam === 0 ? 20 : 4;
  return await getProducts({ page: pageParam, size, category, sort });
};

const useProducts = () => {
  const [category, setCategory] = useState<PRODUCT_CATEGORY_TYPE>(PRODUCT_DEFAULT_CATEGORY);
  const [sort, setSort] = useState<PRODUCT_SORT_TYPE>(PRODUCT_DEFAULT_SORT);

  const { data, error, isError, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["products", category, sort],
    queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam, category, sort }),
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap((page) => page.content) ?? [];

  const handleCategoryChange = (newCategory: PRODUCT_CATEGORY_TYPE) => {
    if (newCategory !== category) {
      setCategory(newCategory);
    }
  };

  const handleSortChange = (newSort: PRODUCT_SORT_TYPE) => {
    if (newSort !== sort) {
      setSort(newSort);
    }
  };

  return {
    products,
    isLoading,
    isFetching,
    error,
    isError,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  };
};

export default useProducts;
