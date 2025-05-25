import { useMemo } from 'react';

import { getProductList } from '@/api/product';

import { Product } from '../types/Product';
import { useAPI } from '@/shared/context/APIContext';

export const useProductListRequest = (priceSelect: string, categorySelect: string) => {
  const query = useMemo(
    () => ({
      page: 0,
      size: 20,
      sort: priceSelect !== '전체' && priceSelect ? `price,${priceSelect}` : '',
      category: categorySelect === '전체' ? '' : categorySelect,
    }),
    [priceSelect, categorySelect]
  );

  const { refetch, isLoading } = useAPI<Product[]>({
    name: 'product',
    fetcher: () => getProductList(query),
  });

  return { refetch, isLoading };
};
