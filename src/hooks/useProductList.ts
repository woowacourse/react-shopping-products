import { useEffect, useState } from "react";

import { fetchProductList, SortOption } from "../api/products";
import { PRODUCT_LIST } from "../constants/productList";
import { Category, Product } from "../interfaces/Product";

interface UseProductListResult {
  productList: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  fetchNextPage: () => void;
}

export default function useProductList(
  category?: Category,
  sortOptionList?: SortOption[]
): UseProductListResult {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const data = await fetchProductList(
          page,
          page === 0
            ? PRODUCT_LIST.initialPageProductQuantity
            : PRODUCT_LIST.additionalPageProductQuantity,
          category,
          sortOptionList
        );
        setProductList((prevProductList) => [
          ...prevProductList,
          ...data.content,
        ]);
        setIsLastPage(data.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getProductList();
  }, [page]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      setPage((prevPage) =>
        prevPage === 0
          ? PRODUCT_LIST.initialPageProductQuantity /
            PRODUCT_LIST.additionalPageProductQuantity
          : prevPage + 1
      );
    }
  };

  return { productList, loading, error, page, fetchNextPage };
}
