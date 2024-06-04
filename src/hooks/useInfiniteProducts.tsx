import { getProducts } from "@/apis/product";
import { GetProductsProps } from "@/pages/productListPage";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteFilteredProducts = ({ category, sort }: GetProductsProps) => {
  return useInfiniteQuery({
    queryKey: ["products", category, sort],
    queryFn: async ({ pageParam = 0 }) => await getProducts({ queryKeys: { category, sort }, pageParam: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return;
      const currentPage = lastPage.pageable.pageNumber;
      return currentPage + 1;
    },
  });
};

export default useInfiniteFilteredProducts;
