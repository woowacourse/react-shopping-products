import { useEffect, useState } from "react";

import { fetchProductList } from "../apis/products";
import { PRODUCT_LIST } from "../constants/productList";
import { Category, Product, Sort } from "../types/type";

interface UseProductListResult {
  productList: Product[];
  productListLoading: boolean;
  productListError: Error | null;
  page: number;
  fetchNextPage: () => void;
  isLastPage: boolean;
  setPage: (page: number) => void;
}

interface UseProductListProps {
  category?: Category;
  sort?: Sort;
}

export default function useProductList({
  category,
  sort,
}: UseProductListProps): UseProductListResult {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListLoading, setProductListLoading] = useState<boolean>(true);
  const [productListError, setProductListError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    console.log(page, category, sort);
    const getProductList = async () => {
      try {
        setProductListLoading(true);
        const data = await fetchProductList(
          page,
          page === 0
            ? PRODUCT_LIST.initialQuantity
            : PRODUCT_LIST.quantityPerPage,
          category,
          sort,
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
      } catch (error) {
        if (error instanceof Error) setProductListError(error);
      } finally {
        setProductListLoading(false);
      }
    };
    getProductList();
  }, [page, category, sort]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      setPage((prevPage) =>
        prevPage === 0
          ? PRODUCT_LIST.initialQuantity / PRODUCT_LIST.quantityPerPage
          : prevPage + 1,
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
