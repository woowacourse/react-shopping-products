import { Product } from '@appTypes/product';
import { BaseResponse } from '@appTypes/response';
import useFetch from '@hooks/useFetch';
import { useCallback, useEffect, useState } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);

  const endpoint = `products?page=${page && page + 4}&size=${page === 0 ? 20 : 4}`;

  const { data } = useFetch<BaseResponse<Product[]>>(endpoint);

  useEffect(() => {
    if (!data) return;

    setProducts((prev) => [...prev, ...data.content]);
  }, [data]);

  const updateNextPage = useCallback(() => {
    if (data?.last) return;
    if (data && data.content.length === 0) return;

    setPage((prev) => prev + 1);
  }, [data]);

  return { products, page, updateNextPage };
};

export default useProducts;
