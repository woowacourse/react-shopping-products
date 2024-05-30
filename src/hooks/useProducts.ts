import { CATEGORY_LIST, Category } from "../constants/category";
import { SORT_LIST, Sort } from "../constants/sort";
import { useEffect, useState } from "react";

import { Product } from "../types/products";
import { getProducts } from "../api/products";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [sort, setSort] = useState(SORT_LIST[0]);

  useEffect(() => {
    if (isLoading) return;
    if (error) return;
    const size = page === 0 ? 20 : 4;

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

    if (page === 0) {
      setPage((page) => page + 5);
      return;
    }

    setPage((page) => page + 1);
  };

  const handleCategoryChange = (newCategory: Category) => {
    if (newCategory !== category) {
      setProducts([]);
      setPage(0);
      setCategory(newCategory);
    }
  };

  const handleSortChange = (newSort: Sort) => {
    if (newSort !== sort) {
      setProducts([]);
      setPage(0);
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
