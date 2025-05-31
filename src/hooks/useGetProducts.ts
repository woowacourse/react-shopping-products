import { useCallback } from 'react';
import { useData } from './useData';
import getProducts from '../api/getProducts';
import { useToast } from './useToast';
import { ProductDTOType } from '../types/product';

type UseGetProductsParams = {
  sort: string;
  category: string;
};

type UseGetProductsReturn = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  products: ProductDTOType[] | null;
};

function useGetProducts({ sort, category }: UseGetProductsParams): UseGetProductsReturn {
  const fetcher = useCallback(() => {
    return getProducts({
      category,
      sortKey: 'price',
      sortOrder: sort,
    });
  }, [category, sort]);

  const { data, loading, error } = useData('products', fetcher);

  const errorMessage = error || '';
  useToast(errorMessage);

  return {
    products: data,
    isLoading: loading,
    isError: !!error,
    errorMessage,
  };
}

export default useGetProducts;
