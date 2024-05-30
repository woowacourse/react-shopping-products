import { useEffect, useState } from 'react';

import { Product } from '@/types/product.type';
import { getProductList } from '@/api/product';

// TODO: 상수처리 파일로 옮기기
const FIRST_PAGE_ITEM_COUNT = 20;
const MORE_LOAD_ITEM_COUNT = 4;

// TODO: hook 분리
const useProductList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(FIRST_PAGE_ITEM_COUNT);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [order, setOrder] = useState<string>('asc');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductList({ page, size, category, order });
        setProducts((prev) => [...prev, ...data.content]);

        setHasNextPage(!data.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, category, order]);

  const fetchNextPage = () => {
    if (page === 0) {
      setPage(FIRST_PAGE_ITEM_COUNT / MORE_LOAD_ITEM_COUNT); // 20 / 4 = 5
      setSize(MORE_LOAD_ITEM_COUNT);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleChangeOrder = (newOrder: string) => {
    if (order === newOrder) return;
    setOrder(newOrder);
    setProducts([]);
    setPage(0);
    setSize(FIRST_PAGE_ITEM_COUNT);
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
    setProducts([]);
    setPage(0);
    setSize(FIRST_PAGE_ITEM_COUNT);
  };

  return {
    page,
    products,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  };
};

export default useProductList;
