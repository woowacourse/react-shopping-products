import { useDataContext } from '../contexts/useDataContext';
import { useData } from './useData';
import { Product } from '../types/product.type';
import { useMemo } from 'react';

export const useProducts = () => {
  const { state } = useDataContext();
  console.log(state);
  const category: string = state.products?.category ?? '전체';
  const sortKey: string = state.products?.sort ?? 'price,asc';

  const endpoint = useMemo(() => {
    const params = new URLSearchParams({
      page: '0',
      size: '20',
      sort: sortKey,
      ...(category !== '전체' ? { category } : {}),
    });
    return `/products?${params.toString()}`;
  }, [category, sortKey]);

  return useData<Product[]>({ key: 'products', endpoint });
};
