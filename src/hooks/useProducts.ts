import { Product } from "@/types/products";
import { useEffect, useState } from "react";
import { getProducts } from "@/apis/product";
import { Category, Sort } from "@/constants/selectOption";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFirstPage = async (category: Category, page: number, sort: Sort) => {
    try {
      setLoading(true);

      const size = currentPage === 0 ? 20 : 4;
      const res = await getProducts({ category, page, size, sort });

      setProducts(res.content);
      setLoading(false);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async (category: Category, page: number, sort: Sort) => {
    try {
      setLoading(true);

      const size = currentPage === 0 ? 20 : 4;

      const res = await getProducts({ category, page, size, sort });
      setProducts((prevProducts) => [...prevProducts, ...res.content]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirstPage("전체", currentPage, "낮은 가격순");
  }, []);

  return { products, fetchFirstPage, fetchNextPage, loading, error, currentPage };
};

export default useProducts;
