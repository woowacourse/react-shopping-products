import { getProducts } from "@/api";
import { Category, Sort } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteProduct = (category: Category, sort: Sort) => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products", category, sort],
    queryFn: ({ pageParam }) =>
      getProducts(pageParam.page, pageParam.size, category, sort),
    initialPageParam: { page: 0, size: 20 },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.last) return;
      if (allPages.length === 0) {
        return { page: 0, size: 20 };
      }
      return { page: allPages.length + 4, size: 4 };
    },
  });
  return {
    data,
    fetchNextPage,
    isFetching,
  };
};

export default useInfiniteProduct;
