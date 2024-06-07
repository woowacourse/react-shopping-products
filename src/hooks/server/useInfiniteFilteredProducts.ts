import { getProducts } from "@/apis/product";
import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import useToast from "@/hooks/useToast";
import { GetProductsProps } from "@/pages/productListPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useInfiniteFilteredProducts = ({ category, sort }: GetProductsProps) => {
  const { onAddToast } = useToast();

  const query = useInfiniteQuery({
    queryKey: [END_POINT.cartItems, category, sort],
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

  const { isError } = query;

  useEffect(() => {
    if (isError) {
      onAddToast(ERROR_MESSAGES.failGetProducts);
    }
  }, [isError]);

  return query;
};

export default useInfiniteFilteredProducts;
