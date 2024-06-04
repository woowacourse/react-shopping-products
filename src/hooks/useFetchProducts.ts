import { useContext, useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';
import usePage from './usePage';
import useProducts from './useProducts';

import { Category, Order, Sort } from '../types/product';
import { ToastContext } from '../context/ToastProvider';

const useFetchProducts = () => {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const { products, addProducts, resetProducts } = useProducts();
  const { page, increasePage, decreasePage, resetPage } = usePage();

  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
    name: 'asc',
  });

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(page, category, sort);

      if (data.last) setIsLastPage(true);

      addProducts(data.content);
    } catch (error) {
      if (error instanceof Error) {
        decreasePage();
        setError(error);
        showToast(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || error) return;

    getProducts();
  }, [page, category, sort]);

  const reset = () => {
    resetPage();
    resetProducts();
    setIsLastPage(false);
  };

  const filterByCategory = (selectedCategory: Category) => {
    if (selectedCategory === category) return;

    reset();
    setCategory(selectedCategory);
  };

  const setSorting = async (condition: string, order: Order) => {
    if (sort.price == order) return;

    reset();
    setSort((prevSort) => ({ ...prevSort, [condition]: order }));
  };

  const fetchNextPage = async () => {
    if (isLastPage || error) return;

    increasePage();
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
