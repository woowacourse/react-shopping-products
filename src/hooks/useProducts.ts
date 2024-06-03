import { Product } from "@/types/products";
import { useState } from "react";
import { getProducts } from "@/apis/product";
import { Category, Sort } from "@/constants/selectOption";
import useToast from "@/hooks/useToast";
import { ERROR_MESSAGES } from "@/constants/messages";

export const SIZE_PER_PAGE = 4;
export const SIZE_FIRST_PAGE = 20;

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const { onAddToast } = useToast();

  const fetchFirstPage = async (category: Category, sort: Sort) => {
    resetToFirstPage();
    try {
      const res = await getProducts({ category, page: 0, size: 20, sort });
      if (res.last) setIsLastPage(true);

      setProducts(res.content);
      setCurrentPage(1);
    } catch (error) {
      if (error instanceof Error) {
        onAddToast(ERROR_MESSAGES.failGetProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async (category: Category, page: number, sort: Sort) => {
    try {
      const size = currentPage === 0 ? SIZE_PER_PAGE : SIZE_FIRST_PAGE;

      const res = await getProducts({ category, page, size, sort });
      if (res.last) setIsLastPage(true);

      setProducts((prevProducts) => [...prevProducts, ...res.content]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      if (error instanceof Error) {
        onAddToast(ERROR_MESSAGES.failGetProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetToFirstPage = () => {
    setProducts([]);
    setIsLastPage(false);
    setLoading(true);
  };

  return { products, fetchNextPage, fetchFirstPage, loading, currentPage, isLastPage, resetToFirstPage };
};

export default useProducts;
