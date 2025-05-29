import { useState } from 'react';

import { getProductList } from '@/api/product';
import { useData } from '@/shared/context/useData';

import { CATEGORY, CategoryType, PriceType } from '../constants/product';

export const useProductFilter = () => {
  const { productData: products } = useData();
  const [categorySelect, setCategorySelect] = useState<CategoryType>('ALL');
  const [priceSelect, setPriceSelect] = useState<PriceType>('asc');

  const handleCategorySelect = async (selectedCategory: CategoryType) => {
    setCategorySelect(selectedCategory);

    const categoryValue = selectedCategory === 'ALL' ? '' : CATEGORY[selectedCategory];
    await products.fetch(() => getProductList({ category: categoryValue }));
  };

  const handlePriceSelect = async (selectedPrice: PriceType) => {
    setPriceSelect(selectedPrice);
    await products.fetch(() => getProductList({ sort: `price,${selectedPrice}` }));
  };

  return {
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
