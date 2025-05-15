import { useEffect, useState, useCallback } from 'react';

import { getProductList } from '@/api/product';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { Product } from '../types/Product';

export const useProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [categorySelect, setCategorySelect] = useState('전체');
  const [priceSelect, setPriceSelect] = useState('전체');
  const { isLoading, handleRequest } = useApiRequest();

  const handleCategorySelect = (category: string) => {
    setCategorySelect(category);
  };

  const handlePriceSelect = (price: string) => {
    setPriceSelect(price);
  };

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
  }, [categorySelect, handleRequest, priceSelect]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return {
    isLoading,
    product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
