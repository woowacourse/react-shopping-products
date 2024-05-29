import { useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';

import { Order, Product, Sort } from '../types/product';
import { FIRST_PAGE, FIRST_PAGE_SIZE, SIZE_PER_PAGE } from '../constants/pagination';
import usePage from './usePage';

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const { page, increasePage, decreasePage, resetPage } = usePage();

  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;
        const data = await fetchProducts(page, size, category, sort);

        if (data.last) setIsLastPage(true);

        setProducts((prevProducts) => [...prevProducts, ...data.content]);
      } catch (error) {
        decreasePage();
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isLastPage && !error) getProducts();
  }, [page, category, sort]);

  const filterByCategory = (selectedCategory: string) => {
    resetPage();
    setProducts([]);
    setIsLastPage(false);
    setCategory(selectedCategory);
  };

  const setSorting = (condition: string, order: Order) => {
    setSort((prevSort) => {
      return {
        ...prevSort,
        [condition]: order,
      };
    });
  };

  const fetchNextPage = () => {
    if (!isLastPage) increasePage();
  };

  return { products, loading, error, page, fetchNextPage, filterByCategory, setSorting };
};

export default useFetchProducts;
