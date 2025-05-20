import { useCallback } from 'react';

import { getProductList } from '@/api/product';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { Product } from '../types/Product';

export const useProductListRequest = (
  setProduct: (data: Product[]) => void,
  priceSelect: string,
  categorySelect: string
) => {
  const { handleRequest, isLoading } = useApiRequest();

  const fetchProductData = useCallback(async () => {
    return handleRequest(
      () =>
        getProductList({
          page: 0,
          size: 20,
          sort: priceSelect !== '전체' && priceSelect ? `price,${priceSelect}` : '',
          category: categorySelect === '전체' ? '' : categorySelect,
        }),
      (data) => {
        setProduct(data);
        return data;
      },
      [],
      { delay: 2000 }
    );
  }, [categorySelect, handleRequest, priceSelect, setProduct]);

  return { fetchProductData, isLoading };
};
