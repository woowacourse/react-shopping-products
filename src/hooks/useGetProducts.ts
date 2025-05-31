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
  const fetchFilteredProducts = useCallback(async () => {
    const products = await getProducts({
      category,
      sortKey: 'price',
      sortOrder: sort,
    });
    return products;
  }, [category, sort]);

  const { data, loading, error } = useData('products', fetchFilteredProducts);

  useToast(error, 'error');

  return {
    products: data,
    isLoading: loading,
    isError: !!error,
    errorMessage: error || '',
  };
}

export default useGetProducts;
