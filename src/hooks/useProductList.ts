import { useEffect, useState } from "react";

import { fetchProductList, SortOption } from "../apis/products";
import { PRODUCT_LIST } from "../constants/productList";
import { Category, Product } from "../interfaces/Product";

interface UseProductListResult {
  productList: Product[];
  productListLoading: boolean;
  productListError: unknown;
  page: number;
  fetchNextPage: () => void;
}

export default function useProductList(
  category?: Category,
  sortOptionList?: SortOption[]
): UseProductListResult {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListLoading, setProductListLoading] = useState<boolean>(true);
  const [productListError, setproductListError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setProductListLoading(true);
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
      } catch (productListError) {
        setproductListError(productListError);
      } finally {
        setProductListLoading(false);
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

  return {
    productList,
    productListLoading,
    productListError,
    page,
    fetchNextPage,
  };
}
