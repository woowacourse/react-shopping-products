import { useCallback } from 'react';
import { getProducts, ProductResponse } from '../api/products';
import { useData } from './useData';
import { CategoryKey, SortKey, getCategoryByKey, getSortByKey } from '../types/selectOptions';
import { createProductsKey } from '../utils/cacheKeys';

type useFetchProductsProps = {
  category: CategoryKey;
  sort: SortKey;
};

export const useFetchProducts = ({ category, sort }: useFetchProductsProps) => {
  const fetchProducts = useCallback(async () => {
    const categoryConfig = getCategoryByKey(category);
    const sortConfig = getSortByKey(sort);

    const data = await getProducts({
      page: 0,
      size: 20,
      ...(sortConfig.apiValue && { sort: sortConfig.apiValue }),
      ...(categoryConfig.apiValue && { category: categoryConfig.apiValue }),
    });

    return data.content;
  }, [category, sort]);

  const key = createProductsKey(category, sort);

  const { data, isLoading, error } = useData<ProductResponse[]>({
    key,
    fetchFn: fetchProducts,
    deps: [category, sort],
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
};
