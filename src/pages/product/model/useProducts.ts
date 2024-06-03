import { useState, useEffect } from 'react';

import { Category, Product, SortOrder } from '@/entities/product';
import { ALL, DEFAULT_CATEGORY, DEFAULT_SORT_ORDER } from '@/features/product';
import { fetchProducts } from '@/shared';

import { EXTRA_FETCH_COUNT, FIRST_FETCH_COUNT, SECONDARY_REQUEST_PAGE_GAP } from '../config/fetchProduct';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  category: typeof ALL | Category;
  sortOrder: SortOrder;
  fetchNextPage: () => void;
  handleChangeCategory: (value: typeof ALL | Category) => void;
  handleChangeSortOrder: (value: SortOrder) => void;
}

export default function useProducts(): UseProductsResult {
  const [totalPage, setTotalPage] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<typeof ALL | Category>(DEFAULT_CATEGORY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);

  useEffect(() => {
    if (error) return;

    const getProducts = async () => {
      const size = page === 0 ? FIRST_FETCH_COUNT : EXTRA_FETCH_COUNT;
      const requestPage = page === 0 ? 0 : page + SECONDARY_REQUEST_PAGE_GAP;

      try {
        setLoading(true);
        const { totalPages, content } = await fetchProducts({
          page: requestPage,
          size,
          category: category,
          sort: sortOrder,
        });

        setError(null);
        setTotalPage(totalPages);
        page === 0 ? setProducts([...content]) : setProducts([...products, ...content]);
      } catch (error: unknown) {
        if (error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, category, sortOrder]);

  const fetchNextPage = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleChangeCategory = (value: typeof ALL | Category) => {
    setCategory(value);
    setPage(0);
  };

  const handleChangeSortOrder = (value: SortOrder) => {
    setSortOrder(value);
    setPage(0);
  };

  return {
    products,
    loading,
    error,
    category,
    sortOrder,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOrder,
  };
}
