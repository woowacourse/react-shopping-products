import { Sorting } from "./../interfaces/Sorting";

import { fetchProductList } from "../apis/products";
import { PRODUCT_LIST } from "../constants/productList";
import { Category } from "../interfaces/Product";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseProductListProps {
  category?: Category;
  sort?: Sorting;
}

export default function useProductList({
  category,
  sort,
}: UseProductListProps) {
  const productListQuery = useInfiniteQuery({
    queryKey: ["productList", category, sort],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductList({
        page: pageParam,
        limit:
          pageParam === 0
            ? PRODUCT_LIST.initialPageProductQuantity
            : PRODUCT_LIST.additionalPageProductQuantity,
        category: category,
        sort: sort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage < lastPage.content.length ? nextPage : undefined;
    },
  });

  return {
    productListQuery,
  };
}
