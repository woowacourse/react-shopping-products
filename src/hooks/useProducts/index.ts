import { useState } from 'react';

import { Category, Order, Sort } from '../../types/product';
import { useProductsInfiniteScroll } from '../queries/products/query';

const useFetchProducts = () => {
  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
    id: 'asc',
  });

  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useProductsInfiniteScroll(category, sort);

  const filterByCategory = (selectedCategory: Category) => {
    if (selectedCategory === category) return;

    setCategory(selectedCategory);
  };

  const setSorting = async (condition: string, order: Order) => {
    if (sort.price === order) return;

    setSort((prevSort) => ({ ...prevSort, [condition]: order }));
  };

  return {
    products: data?.pages,
    isLoading,
    error,
    sort,
    category,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    filterByCategory,
    setSorting,
  };
};

export default useFetchProducts;
