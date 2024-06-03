import { useEffect, useState } from 'react';

import { getProductList } from '@/api/product';
import { FETCH_SIZE } from '@/constants/productList';
import { Product } from '@/types/product.type';

const useProductList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(FETCH_SIZE.firstPageItemCount);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sort, setSort] = useState<string>('asc');
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
  }, [page, category, sort]);

  const fetchNextPage = () => {
    if (page === 0) {
      setPage(FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount); // 20 / 4 = 5
      setSize(FETCH_SIZE.moreLoadItemCount);
      setPage(FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleChangeSort = (newSort: string) => {
    if (sort === newSort) return;
    setSort(newSort);
    resetProductState();
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
    resetProductState();
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
