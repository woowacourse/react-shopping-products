import { useEffect, useState } from 'react';

import { useProductListRequest } from './useProductListRequest';

export const useProductList = () => {
  const [categorySelect, setCategorySelect] = useState('전체');
  const [priceSelect, setPriceSelect] = useState('전체');

  const { refetch, isLoading } = useProductListRequest(priceSelect, categorySelect);

  const handleCategorySelect = (category: string) => {
    setCategorySelect(category);
  };

  const handlePriceSelect = (price: string) => {
    setPriceSelect(price);
  };

  useEffect(() => {
    refetch(); // 필터 바뀔 때마다 다시 요청
  }, [priceSelect, categorySelect]);

  return {
    isLoading,
    // product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
