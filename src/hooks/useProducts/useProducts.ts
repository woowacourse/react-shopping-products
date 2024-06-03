import { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/product';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';
import usePagination from '../usePagination';
import useFetcher from '../useFetcher';
import { SIZE } from '../../constants/api';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  isLast: boolean;
  page: number;
  category: Option;
  sort: Option;
  handleCategory: (category: Option) => void;
  handleSort: (sort: Option) => void;
  handlePage: () => void;
}

const useProduct = (initialCategory: Option, initialSorting: Option): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);
  const [isLast, setIsLast] = useState(false);
  const { page, resetPage, moveNextPage } = usePagination();
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(handleProducts);
  }, [page, category, sort]);

  const getProducts = async (category: Option, sort: Option) => {
    const { data, isLast } = await fetchProducts(category.key, page, SIZE.ADDITIONAL, sort.key);
    setProducts(page === 0 ? data : [...products, ...data]);
    setIsLast(isLast);
  };

  const handleProducts = () => getProducts(category, sort);

  const handleCategory = (category: Option) => {
    setCategory(category);
    resetPage();
  };

  const handleSort = (sort: Option) => {
    setSort(sort);
    resetPage();
  };

  const handlePage = () => moveNextPage(loading, isLast);

  return {
    products,
    loading,
    error,
    isLast,
    page,
    category,
    sort,
    handleCategory,
    handleSort,
    handlePage,
  };
};

export default useProduct;
