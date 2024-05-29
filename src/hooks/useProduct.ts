import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/product';
import { Product } from '../types/Product.type';
import { Option } from '../utils/option';
import usePagination from './usePagination';
import useFetcher from './useFetcher';

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
  handlePage: () => void;
}

export default function useProducts(initialCategory: Option, initialSorting: Option): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);
  const [isLast, setIsLast] = useState(false);
  const { page, resetPage, moveNextPage } = usePagination();
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(() => getProducts(category, sort));
  }, [page, category, sort]);

  const getProducts = async (category: Option, sort: Option) => {
    const { data, isLast } = await fetchProducts(category.key, page, 4, sort.key);
    setProducts(page === 0 ? data : [...products, ...data]);
    setIsLast(isLast);
  };

  const handleCategory = (category: Option) => {
    setCategory(category);
    resetPage();
  };

  const handleSort = (sort: Option) => {
    setSort(sort);
    resetPage();
  };

  const handlePage = () => moveNextPage(loading, isLast);

  return { products, loading, error, page, category, sort, isLast, handleCategory, handleSort, handlePage };
}
