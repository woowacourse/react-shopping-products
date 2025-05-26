import { useCallback, useEffect, useState } from "react";

import { ProductCategory } from "../types/ProductCategory";
import { PriceSort } from "../types/Sort";

import fetchProductList from "../apis/product/productList/fetchProductList";
import {
  ALL_CATEGORY,
  CATEGORIES,
  LOW_PRICE_SORT_KEY,
  PRICE_SORTS_KEYS,
} from "../constants/filterOptions";

import useData from "./useData";

const contains = <T extends string>(
  value: string,
  list: ReadonlyArray<T>
): value is T => {
  return list.some((item) => item === value);
};

const isProductCategory = (value: string) => {
  return contains<ProductCategory>(value, CATEGORIES);
};

const isProductPriceSort = (value: string): value is PriceSort => {
  return contains<PriceSort>(value, PRICE_SORTS_KEYS);
};

const useProductList = () => {
  const [category, setCategory] = useState<ProductCategory>(ALL_CATEGORY);
  const [sort, setSort] = useState<PriceSort>(LOW_PRICE_SORT_KEY);

  const getProductList = useCallback(async () => {
    try {
      const { content } = await fetchProductList({
        params: {
          category,
          sort,
          page: "0",
          size: "20",
        },
      });

      return content;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      throw new Error(error.message);
    }
  }, [category, sort]);

  const {
    data: productList,
    loading,
    refetch,
  } = useData({
    fetcher: getProductList,
    name: "productList",
  });

  const handleCategory = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isProductCategory(value)) {
        return;
      }

      setCategory(value);
    },
    []
  );

  const handleSort = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isProductPriceSort(value)) {
        return;
      }

      setSort(value);
    },
    []
  );

  useEffect(() => {
    refetch();
  }, [category, refetch, sort]);

  return {
    productList,
    loading,
    handleCategory,
    handleSort,
  };
};

export default useProductList;
