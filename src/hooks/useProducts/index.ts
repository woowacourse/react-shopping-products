import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { fetchProducts } from '../../api/products';

import { Category, Order } from '../../types/product';
import { FIRST_PAGE, GAP_WITH_FIRST_PAGE } from '../../constants/pagination';

const useProducts = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<Category>('all');
  const [priceOrder, setPriceOrder] = useState<Order>('asc');

  const getProducts = useInfiniteQuery({
    queryKey: ['products', category, priceOrder],
    queryFn: ({ pageParam }) => fetchProducts(pageParam),
    networkMode: 'always',
    initialPageParam: {
      page: FIRST_PAGE,
      category,
      priceOrder,
    },
    getNextPageParam: (prevPage, allPages) => {
      if (prevPage.last) return;

      const isFirstPage = allPages.length === 1;
      const nextPage = allPages.length + GAP_WITH_FIRST_PAGE - 1;

      return isFirstPage
        ? { page: FIRST_PAGE + GAP_WITH_FIRST_PAGE, category, priceOrder }
        : { page: nextPage, category, priceOrder };
    },
    select: (data) => {
      const products = data.pages.map((page) => page.content).flat();

      return products;
    },
  });

  const handleCategoryChange = (selectedCategory: Category) => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
      queryClient.invalidateQueries({ queryKey: ['products', selectedCategory, priceOrder] });
    }
  };

  const handlePriceOrderChange = (selectedPriceOrder: Order) => {
    if (selectedPriceOrder !== priceOrder) {
      setPriceOrder(selectedPriceOrder);
      queryClient.invalidateQueries({ queryKey: ['products', category, selectedPriceOrder] });
    }
  };

  return {
    getProducts,
    category,
    handleCategoryChange,
    priceOrder,
    handlePriceOrderChange,
  };
};

export default useProducts;
