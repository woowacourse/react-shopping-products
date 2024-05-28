import { useEffect, useState } from 'react';

import { fetchProductList } from '@/api/product';

const useProductList = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getProductList = async () => {
      const data = await fetchProductList(page);

      setProductList(data);
    };

    getProductList();
  }, []);

  return { productList, page };
};

export default useProductList;
