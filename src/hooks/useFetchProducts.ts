import { useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';
import usePage from './usePage';
import useProducts from './useProducts';

import { Order, Sort } from '../types/product';

const useFetchProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const { products, addProducts, resetProducts } = useProducts();
  const { page, increasePage, decreasePage, resetPage } = usePage();

  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<Sort>({
    price: 'desc',
  });

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(page, category, sort);

      if (data.last) setIsLastPage(true);

      addProducts(data.content);
    } catch (error) {
      decreasePage();
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLastPage && !error) getProducts();
  }, [page, category, sort]);

  const reset = () => {
    resetPage();
    resetProducts();
    setIsLastPage(false);
  };

  const filterByCategory = (selectedCategory: string) => {
    if (selectedCategory !== category) {
      reset();
      setCategory(selectedCategory);
    }
  };

  const setSorting = (condition: string, order: Order) => {
    if (sort.price !== order) {
      reset();
      setSort((prevSort) => {
        return {
          ...prevSort,
          [condition]: order,
        };
      });
    }
  };

  const fetchNextPage = () => {
    if (!isLastPage) increasePage();
  };

  return {
    products,
    loading,
    error,
    page,
    fetchNextPage,
    category,
    filterByCategory,
    sort,
    setSorting,
  };
};

export default useFetchProducts;
