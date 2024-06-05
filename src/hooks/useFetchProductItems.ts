import { getProducts } from "@/apis/product";
import QUERY_KEY from "@/constants/queryKey";
import { Category, Sort } from "@/constants/selectOption";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchProductItems = (category: Category, sort: Sort) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.getProducts, category, sort],
    queryFn: ({ pageParam = 0 }) => getProducts({ category, page: pageParam, sort }),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;

      return pages.length + 1;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
  });
};

export default useFetchProductItems;
