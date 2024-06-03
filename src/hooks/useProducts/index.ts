import { useEffect, useState } from 'react';

import { fetchProducts } from '../../api/products';
import usePage from '../usePage';

import { Category, Order, Product } from '../../types/product';

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>('all');
  const [priceOrder, setPriceOrder] = useState<Order>('asc');

  const { page, increasePage, decreasePage, resetPage } = usePage();

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(page, category, priceOrder);

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
  }, [page, category, priceOrder]);

  const reset = () => {
    resetPage();
    setProducts([]);
    setIsLastPage(false);
  };

  const handleCategoryChange = (selectedCategory: Category) => {
    if (selectedCategory !== category) {
      reset();
      setCategory(selectedCategory);
    }
  };

  const handlePriceOrderChange = (selectedPriceOrder: Order) => {
    if (selectedPriceOrder !== priceOrder) {
      reset();
      setPriceOrder(selectedPriceOrder);
    }
  };

  const fetchNextPage = () => {
    if (!isLastPage && !error) increasePage();
  };

  return {
    products,
    productsLoading: loading,
    productsError: error,
    page,
    fetchNextPage,
    category,
    handleCategoryChange,
    priceOrder,
    handlePriceOrderChange,
  };
};

export default useProducts;
