import { useEffect, useState } from 'react';

import { Product } from '@/types/product.type';
import { getProductList } from '@/api/product';

// TODO: 상수처리 파일로 옮기기
const FIRST_PAGE_ITEM_COUNT = 20;
const MORE_LOAD_ITEM_COUNT = 4;

const useProductList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(FIRST_PAGE_ITEM_COUNT);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isDesc, setIsDesc] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (page > 1) setSize(MORE_LOAD_ITEM_COUNT);

    const fetchData = async () => {
      setLoading(true);

      try {
        const sortOrder = isDesc ? 'desc' : 'asc';
        const data = await getProductList({ page, size, category, sortOrder });
        setProducts((prev) => [...prev, ...data.content]);

        if (data.last) setHasNextPage((prev) => !prev);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, isDesc, category]);

  const fetchNextPage = () => {
    if (hasNextPage && page === 1) {
      const SKIP_PAGES = FIRST_PAGE_ITEM_COUNT / MORE_LOAD_ITEM_COUNT;
      setPage((prev) => prev + SKIP_PAGES);
    }

    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleChangeSort = () => {
    setIsDesc((prev) => !prev);
    setProducts([]);
    setPage(0);
  };

  const handleChangeCategory = (category: string) => {
    setCategory(category);
    setProducts([]);
    setPage(0);
  };

  return {
    page,
    products,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeSort,
    handleChangeCategory,
  };
};

export default useProductList;
