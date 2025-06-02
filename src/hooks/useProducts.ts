import { useDataContext } from '../contexts/useDataContext';
import { useData } from './useData';
import { Product } from '../components/ProductCardList/product.type';
import { useMemo } from 'react';
import { fetchProducts } from '../APIs/productApi';

export const useProducts = () => {
  const { state } = useDataContext();
  const category: string = state.products?.category ?? '전체';
  const sort: string = state.products?.sort ?? 'price,asc';

  const endpoint = useMemo(() => {
    const params = new URLSearchParams({
      page: '0',
      size: '20',
      sort,
      ...(category !== '전체' ? { category } : {}),
    });
    return `/products?${params.toString()}`;
  }, [category, sort]);

  return useData<Product[]>({
    key: 'products',
    endpoint,
    fetchFunction: fetchProducts,
  });
};
