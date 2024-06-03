import { Sorting } from "./../interfaces/Sorting";
import { useEffect, useState } from "react";

import { fetchProductList } from "../apis/products";
import { PRODUCT_LIST } from "../constants/productList";
import { Category, Product } from "../interfaces/Product";

interface UseProductListResult {
  productList: Product[];
  productListLoading: boolean;
  productListError: unknown;
  page: number;
  fetchNextPage: () => void;
  isLastPage: boolean;
  setPage: (page: number) => void;
}

interface UseProductListProps {
  category?: Category;
  sortOption?: Sorting;
}

export default function useProductList(
  option: UseProductListProps
): UseProductListResult {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListLoading, setProductListLoading] = useState<boolean>(true);
  const [productListError, setProductListError] = useState<unknown>(null);
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
          option.category,
          option.sortOption
        );
        if (page === 0) {
          setProductList(data.content);
        } else {
          setProductList((prevProductList) => [
            ...prevProductList,
            ...data.content,
          ]);
        }
        setIsLastPage(data.last);
      } catch (productListError) {
        setProductListError(productListError);
      } finally {
        setProductListLoading(false);
      }
    };
    getProductList();
  }, [page, option.category, option.sortOption]);

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
    setPage,
    productList,
    productListLoading,
    productListError,
    page,
    fetchNextPage,
    isLastPage,
  };
}
