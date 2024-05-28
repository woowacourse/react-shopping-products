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

  useEffect(() => {
    if (page > 1) setSize(MORE_LOAD_ITEM_COUNT);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductList({ page, size });
        setProducts((prev) => [...prev, ...data.content]);

        if (data.last) setHasNextPage((prev) => !prev);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  return { page, products, loading, error, fetchNextPage, hasNextPage };
};

export default useProductList;
