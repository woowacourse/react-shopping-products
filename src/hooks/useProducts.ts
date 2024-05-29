import { useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';

import { Product } from '../types/product';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  SIZE_PER_PAGE,
} from '../constants/pagination';

export default function useProducts() {
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;
        const data = await fetchProducts(page, size, category);

        if (data.last) setIsLastPage(true);

        setProducts((prevProducts) => [...prevProducts, ...data.content]);
      } catch (error) {
        setPage((prevPage) =>
          page === FIRST_PAGE + GAP_WITH_FIRST_PAGE ? prevPage - GAP_WITH_FIRST_PAGE : prevPage - 1,
        );
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isLastPage && !error) getProducts();
  }, [page, category]);

  const filterByCategory = (selectedCategory: string) => {
    setPage(0);
    setProducts([]);
    setIsLastPage(false);
    setCategory(selectedCategory);
  };

  const fetchNextPage = () => {
    if (!isLastPage)
      setPage((prevPage) =>
        prevPage === FIRST_PAGE ? prevPage + GAP_WITH_FIRST_PAGE : prevPage + 1,
      );
  };

  return { products, loading, error, page, fetchNextPage, filterByCategory };
}
