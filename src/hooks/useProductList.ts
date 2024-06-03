import { useEffect, useState } from 'react';

import { getProductList } from '@/api/product';
import { FETCH_SIZE } from '@/constants/productList';
import { Product } from '@/types/product.type';

const useProductList = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sort, setSort] = useState<string>('asc');
  const [category, setCategory] = useState('');

  const resetProductState = () => {
    setProducts([]);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const size =
          page === 0
            ? FETCH_SIZE.firstPageItemCount
            : FETCH_SIZE.moreLoadItemCount;
        const data = await getProductList({ page, size, category, sort });

        if (page === 0) {
          setProducts(data.content);
        } else {
          setProducts((prev) => [...prev, ...data.content]);
        }

        setHasNextPage(!data.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [page, category, sort]);

  const loadNextPage = () => {
    if (page === 0) {
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
    loadNextPage,
    hasNextPage,
    handleChangeSort,
    handleChangeCategory,
  };
};

export default useProductList;
