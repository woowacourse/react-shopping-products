import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/product';
import { Product } from '../types/Product.type';
import { Option } from '../utils/option';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  category: Option;
  sort: Option;
  isLast: boolean;
  handleCategory: (category: Option) => void;
  handleSort: (sort: Option) => void;
  fetchNextPage: () => void;
}

export default function useProducts(initialCategory: Option, initialSorting: Option): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    getProducts(category, sort);
  }, [page, category, sort]);

  const getProducts = async (category: Option, sort: Option) => {
    try {
      const { data, isLast } = await fetchProducts(category.key, page, 4, sort.key);

      setProducts(page === 0 ? data : [...products, ...data]);
      setIsLast(isLast);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (category: Option) => {
    setCategory(category);
    setPage(0);
  };

  const handleSort = (sort: Option) => {
    setSort(sort);
    setPage(0);
  };

  const fetchNextPage = () => {
    if (!loading && !isLast) {
      const pageUnit = page === 0 ? 5 : 1;

      setPage((prevPage) => prevPage + pageUnit);
      setLoading(true);
    }
  };

  return { products, loading, error, page, category, sort, isLast, handleCategory, handleSort, fetchNextPage };
}
