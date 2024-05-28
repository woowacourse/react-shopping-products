import { useEffect, useState } from 'react';

import { fetchProductList } from '@/api/product';
import { Product } from '@/types/product';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const getProductList = async () => {
      const limit = page === 0 ? 20 : 4;
      const productData = await fetchProductList(page, limit);

      setProductList((prev) => [...prev, ...productData.content]);
    };

    getProductList();
  }, [page]);

  return { productList, page, fetchNextPage };
};

export default useProductList;
