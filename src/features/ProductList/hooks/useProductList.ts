import { useEffect, useState } from 'react';

import { getProductList } from '@/api/product';

import { Product } from '../types/Product';

export const useProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [categorySelect, setCategorySelect] = useState('전체');
  const [priceSelect, setPriceSelect] = useState('전체');

  const handleCategorySelect = (category: string) => {
    setCategorySelect(category);
  };

  const handlePriceSelect = (price: string) => {
    setPriceSelect(price);
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductList({
        page: 0,
        size: 20,
        sort: priceSelect !== '전체' && priceSelect ? `price,${priceSelect}` : '',
        category: categorySelect === '전체' ? '' : categorySelect,
      });
      setProduct(product);
    };
    getProduct();
  }, [categorySelect, priceSelect]);

  return {
    product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
