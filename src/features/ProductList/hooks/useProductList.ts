import { useEffect, useState } from 'react';

import { useProductListRequest } from './useProductListRequest';

import { Product } from '../types/Product';

export const useProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [categorySelect, setCategorySelect] = useState('전체');
  const [priceSelect, setPriceSelect] = useState('전체');
  const { fetchProductData, isLoading } = useProductListRequest(
    setProduct,
    priceSelect,
    categorySelect
  );

  const handleCategorySelect = (category: string) => {
    setCategorySelect(category);
  };

  const handlePriceSelect = (price: string) => {
    setPriceSelect(price);
  };

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
