import { useCallback } from 'react';
import { getProducts, ProductResponse } from '../api/products';
import { useData } from './useData';

type useFetchProductsProps = {
  category: string;
  sort: string;
  categoryQueryMap: Record<string, string | undefined>;
  sortQueryMap: Record<string, string | undefined>;
};

export const useFetchProducts = ({
  category,
  sort,
  categoryQueryMap,
  sortQueryMap,
}: useFetchProductsProps) => {
  const fetchProducts = useCallback(async () => {
    const matchedCategory = categoryQueryMap[category];
    const matchedSort = sortQueryMap[sort];

    const data = await getProducts({
      page: 0,
      size: 20,
      ...(matchedSort && { sort: matchedSort }),
      ...(matchedCategory && { category: matchedCategory }),
    });

    return data.content;
  }, [category, sort, categoryQueryMap, sortQueryMap]);

  const key = `products-${category}-${sort}`;

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
