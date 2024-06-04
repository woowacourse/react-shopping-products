import { CATEGORY_LIST, Category } from "../constants/category";
import {
  FIRST_PAGE,
  GAP_WITH_FIRST_PAGE,
  SIZE_OF_FIRST_PAGE,
  SIZE_PER_PAGE,
} from "../constants/pagination";
import { SORT_LIST, Sort } from "../constants/sort";
import { useEffect, useState } from "react";

import { Product } from "../types/products";
import { getProducts } from "../api/products";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(FIRST_PAGE);
  const [isLastPage, setIsLastPage] = useState(false);

  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [sort, setSort] = useState(SORT_LIST[0]);

  useEffect(() => {
    if (isLoading || error) return;
    const size = page === FIRST_PAGE ? SIZE_OF_FIRST_PAGE : SIZE_PER_PAGE;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { content, last } = await getProducts({
          page,
          size,
          category,
          sort,
        });

        setProducts((prevProducts) => [...prevProducts, ...content]);
        setIsLastPage(last);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, category]);

  const fetchNextPage = () => {
    if (isLastPage) {
      return;
    }

    if (page === FIRST_PAGE) {
      setPage((page) => page + GAP_WITH_FIRST_PAGE);
      return;
    }

    setPage((page) => page + 1);
  };

  const handleCategoryChange = (newCategory: Category) => {
    if (newCategory !== category) {
      setProducts([]);
      setPage(FIRST_PAGE);
      setCategory(newCategory);
    }
  };

  const handleSortChange = (newSort: Sort) => {
    if (newSort !== sort) {
      setProducts([]);
      setPage(FIRST_PAGE);
      setSort(newSort);
    }
  };

  return {
    products,
    page,
    isLoading,
    error,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  };
};

export default useProducts;
