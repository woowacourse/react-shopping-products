import { useEffect, useState } from 'react';

import { fetchProducts } from '../../api/products';
import usePage from '../usePage';

import { Category, Order, Product, Sort } from '../../types/product';

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
  });

  const { page, increasePage, decreasePage, resetPage } = usePage();

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(page, category, sort);

      setIsLastPage(data.last);
      setProducts((prevProducts) => [...prevProducts, ...data.content]);
    } catch (error) {
      decreasePage();
      setError(error);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLastPage && !error) getProducts();
  }, [page, category, sort]);

  const reset = () => {
    resetPage();
    setProducts([]);
  };

  const filterByCategory = (selectedCategory: Category) => {
    if (selectedCategory !== category) {
      reset();
      setCategory(selectedCategory);
    }
  };

  const filterBySort = (condition: string, order: Order) => {
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
    if (!isLastPage && !error) increasePage();
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
    filterBySort,
  };
};

export default useProducts;
