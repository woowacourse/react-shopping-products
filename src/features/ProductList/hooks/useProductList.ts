import { useEffect, useState } from 'react';

import { getProductList } from '@/api/product';

import { Product } from '../types/Product';

export const useProductList = (selecet1: string, select2?: string) => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductList({
        page: 0,
        size: 20,
        sort: select2 ? `price,${select2}` : '',
        category: selecet1 === '전체' ? '' : selecet1,
      });
      setProduct(product);
    };
    getProduct();
  }, [selecet1, select2]);

  return {
    product,
  };
};
