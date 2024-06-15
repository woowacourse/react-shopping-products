import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getProducts } from "../api";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface ProductsResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: SortInfo;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

const useProductsInfiniteQuery = (category: Category | "all", sort: Sort) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: [QUERY_KEYS.getProducts, category, sort],
    queryFn: ({ pageParam }) =>
      getProducts({
        category: category === "all" ? undefined : category,
        sort,
        page: pageParam as number,
        size: pageParam === 0 ? 20 : 4,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.first) return 5;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};

export default useProductsInfiniteQuery;
