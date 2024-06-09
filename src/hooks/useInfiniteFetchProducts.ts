import {
  FIRST_PAGE,
  GAP_WITH_FIRST_PAGE,
  SIZE_OF_FIRST_PAGE,
  SIZE_PER_PAGE,
} from "../constants/pagination";

import { Category } from "../constants/category";
import { Sort } from "../constants/sort";
import { getProducts } from "../api/products";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  category: Category;
  sort: Sort;
}

const useInfiniteFetchProducts = ({ category, sort }: Props) => {
  return useInfiniteQuery({
    queryKey: ["products", category, sort],
    queryFn: ({ pageParam }) =>
      getProducts({
        page: pageParam,
        size: pageParam === FIRST_PAGE ? SIZE_OF_FIRST_PAGE : SIZE_PER_PAGE,
        category,
        sort,
      }),
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      if (pages.length === 1) return GAP_WITH_FIRST_PAGE;
      return pages.length - 2 + GAP_WITH_FIRST_PAGE + 1;
    },
  });
};

export default useInfiniteFetchProducts;
