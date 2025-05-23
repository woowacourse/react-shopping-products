import { useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';

export const useGetProducts = ({ sort, category }: { sort: string; category: string }) => {
  const { products, isLoading, isError, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts({ sort, category });
  }, [sort, category, fetchProducts]);

  return { isLoading, isError, products };
};
