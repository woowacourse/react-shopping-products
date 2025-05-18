import { useState } from 'react';
import { Product } from '../App';
import getProducts, { GetProductsProps } from '../api/getProducts';

type ErrorState = {
  isError: boolean;
  status: number | null;
};

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<ErrorState>({
    isError: false,
    status: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (options: GetProductsProps = {}) => {
    try {
      setIsLoading(true);
      const { data, status } = await getProducts(options);
      setProducts(data.content);
      setError({ isError: false, status: Number(status) });
    } catch (e) {
      if (e instanceof Error) {
        setError({ isError: true, status: Number(e.message) });
      } else {
        setError({ isError: true, status: null });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    products,
    error,
    isLoading,
    fetchProducts,
  };
};

export default useProducts;
