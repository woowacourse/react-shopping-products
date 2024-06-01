import { Product } from "@/types/products";
import { useState } from "react";
import { getProducts } from "@/apis/product";
import { Category, Sort } from "@/constants/selectOption";
import useToast from "@/hooks/useToast";
import { ERROR_MESSAGES } from "@/constants/messages";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const { onAddToast } = useToast();

  const fetchProductPage = async (category: Category, page: number, sort: Sort) => {
    try {
      setLoading(true);

      const size = page === 0 ? 20 : 4;

      const res = await getProducts({ category, page, size, sort });
      if (res.last) setIsLastPage(true);

      page === 0 ? setProducts(res.content) : setProducts((prevProducts) => [...prevProducts, ...res.content]);

      setCurrentPage(page + 1);
    } catch (error) {
      if (error instanceof Error) {
        onAddToast(ERROR_MESSAGES.failGetProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const isAbleFetchNextPage = !loading && !isLastPage;

  return { products, fetchProductPage, loading, currentPage, isLastPage, isAbleFetchNextPage };
};

export default useProducts;
