import { useEffect, useState } from 'react';

import { Product } from '@/types/product.type';
import { getProductList } from '@/api/product';

// TODO: 상수처리 파일로 옮기기
const FIRST_PAGE_ITEM_COUNT = 20;
const MORE_LOAD_ITEM_COUNT = 4;

// TODO: hook 리팩터링 (분리)
const useProductList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(FIRST_PAGE_ITEM_COUNT);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [order, setOrder] = useState<string>('asc');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (page > 1) setSize(MORE_LOAD_ITEM_COUNT);

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getProductList({ page, size, category, order });
        setProducts((prev) => [...prev, ...data.content]);

        if (data.last) {
          setHasNextPage((prev) => !prev);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, order, category]);

  const fetchNextPage = () => {
    if (hasNextPage && page === 1) {
      const SKIP_PAGES = FIRST_PAGE_ITEM_COUNT / MORE_LOAD_ITEM_COUNT;
      setPage((prev) => prev + SKIP_PAGES);
    }

    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleChangeOrder = (newOrder: string) => {
    if (order === newOrder) return;
    setOrder(newOrder);
    setProducts([]);
    setPage(0);
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
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
    handleChangeOrder,
    handleChangeCategory,
  };
};

export default useProductList;
