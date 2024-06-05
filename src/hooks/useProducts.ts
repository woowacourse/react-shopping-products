import { Product } from "@/types/products";
import { useCallback, useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import { ERROR_MESSAGES } from "@/constants/messages";
import useInfiniteFilteredProducts from "@/hooks/server/useInfiniteFilteredProducts";
import { Category, Sort } from "@/constants/selectOption";

export const SIZE_PER_PAGE = 4;
export const SIZE_FIRST_PAGE = 20;

const useProducts = ({ category, sort }: { category: Category; sort: Sort; isIntersecting: boolean }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { fetchNextPage, data, isLoading, hasNextPage, isError } = useInfiniteFilteredProducts({ category, sort });

  const { onAddToast } = useToast();

  const setNextPageData = useCallback(() => {
    if (data) {
      const result: Product[] = [];
      data.pages.forEach((pageData) => {
        result.push(...pageData.content);
      });
      setProducts(result);
    }
  }, [data]);

  useEffect(() => {
    setNextPageData();
  }, [data]);

  useEffect(() => {
    if (isError) {
      onAddToast(ERROR_MESSAGES.failGetProducts);
    }
  }, [isError, onAddToast]);

  return { products, isLoading, hasNextPage, fetchNextPage, isError };
};

export default useProducts;
