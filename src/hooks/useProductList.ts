import { useEffect, useState } from "react";

import { Product } from "../types/Product";
import { ProductCategory } from "../types/ProductCategory";
import { PriceSort } from "../types/Sort";

import fetchProductList from "../apis/product/productList/fetchProductList";
import {
  ALL_CATEGORY,
  CATEGORIES,
  LOW_PRICE_SORT_KEY,
  PRICE_SORTS_KEYS,
} from "../constants/filterOptions";

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
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<ProductCategory>(ALL_CATEGORY);
  const [sort, setSort] = useState<PriceSort>(LOW_PRICE_SORT_KEY);

  const handleCategory = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isProductCategory(value)) {
      return;
    }

    setCategory(value);
  };

  const handleSort = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isProductPriceSort(value)) {
      return;
    }

    setSort(value);
  };

  useEffect(() => {
    const loadProductList = async () => {
      try {
        const { content } = await fetchProductList({
          params: {
            category,
            sort,
            page: "0",
            size: "20",
          },
        });

        setProductList(content);
      } catch (error) {
        console.log(error);
      }
    };

    loadProductList();
  }, [category, sort]);

  return { productList, handleCategory, handleSort };
};

export default useProductList;
