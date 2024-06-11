import { getProducts } from "@/apis/product";
import { END_POINT } from "@/config/endPoint";
import { GetProductsProps } from "@/pages/productListPage";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFilteredProducts = ({ category, sort }: GetProductsProps) => {
  const query = useInfiniteQuery({
    queryKey: [END_POINT.products, category, sort],
    queryFn: async ({ pageParam }) => await getProducts({ queryKeys: { category, sort }, pageParam: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return;
      const currentPage = lastPage.pageable.pageNumber;
      return currentPage + 1;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    staleTime: 10000,
  });

  return query;
};

export default useFilteredProducts;
