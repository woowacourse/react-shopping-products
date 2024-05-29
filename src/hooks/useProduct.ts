import { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../api/product';
import { Product } from '../types/Product.type';
import { Option } from '../utils/option';
import { ToastContext } from '../context/ToastProvider';

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
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    getProducts(category, sort);
  }, [page, category, sort]);

  const getProducts = async (category: Option, sort: Option) => {
    try {
      const { data, isLast } = await fetchProducts(category.key, page, 4, sort.key);

      setProducts(page === 0 ? data : [...products, ...data]);
      setIsLast(isLast);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        showToast('상품 목록을 불러오는 과정에서 에러가 발생했습니다.');
      }
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
