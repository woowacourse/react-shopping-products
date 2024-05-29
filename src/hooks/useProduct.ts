import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/product';
import { Product } from '../types/Product.type';
import { Option } from '../utils/option';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  category: Option;
  sort: Option;
  handleCategory: (category: Option) => void;
  handleSort: (sort: Option) => void;
}

export default function useProducts(initialCategory: Option, initialSorting: Option): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getProducts(category, sort);
  }, [page]);

  const getProducts = async (category: Option, sort: Option) => {
    try {
      const data = await fetchProducts(category.key, page, 4, sort.key);
      setProducts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (category: Option) => {
    setCategory(category);
    getProducts(category, sort);
  };

  const handleSort = (sort: Option) => {
    setSort(sort);
    getProducts(category, sort);
  };

  //   const fetchNextPage = () => {
  //     if (page < 21) {
  //       setPage((prevPage) => prevPage + 1);
  //       setLoading(true);
  //     }
  //   };

  return { products, loading, error, page, category, handleCategory, sort, handleSort };
}
