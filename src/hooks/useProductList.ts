import { useEffect, useState } from 'react';

import { fetchProductList } from '@/api/product';
import { Product } from '@/types/product';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextPage = () => {
    if (isLastPage) return;

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const limit = page === 0 ? 20 : 4;
        const productData = await fetchProductList(page, limit);
        if (productData.last) {
          setIsLastPage(true);
        }
        setProductList((prev) => [...prev, ...productData.content]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProductList();
  }, [page]);

  return { productList, page, fetchNextPage, isLoading };
};

export default useProductList;
