import { useRef, useState } from 'react';

import { fetchProducts } from '../api/products';
import usePage from './usePage';
import useProducts from './useProducts';

import { Category, Order, Sort } from '../types/product';
import useIntersectionObserver from './useIntersectionObserver';

const useFetchProducts = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const { products, addProducts, resetProducts } = useProducts();
  const { page, increasePage, decreasePage, resetPage } = usePage();

  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
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
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    resetPage();
    resetProducts();
    setIsLastPage(false);
  };

  const filterByCategory = async (selectedCategory: Category) => {
    if (selectedCategory === category) return;

    reset();
    setCategory(selectedCategory);
    await getProducts();
  };

  const setSorting = async (condition: string, order: Order) => {
    if (sort.price == order) return;

    reset();
    setSort((prevSort) => ({ ...prevSort, [condition]: order }));
    await getProducts();
  };

  const fetchNextPage = async () => {
    if (isLastPage || error) return;

    increasePage();
    await getProducts();
  };

  useIntersectionObserver(loading, observerRef, fetchNextPage, { threshold: 0.8 });

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
    observerRef,
  };
};

export default useFetchProducts;
