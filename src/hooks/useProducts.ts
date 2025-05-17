import { useState } from 'react';
import { Product } from '../App';
import getProducts, { GetProductsProps } from '../api/getProducts';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (options: GetProductsProps = {}) => {
    try {
      setIsLoading(true);
      const { data, status } = await getProducts(options);
      setProducts(data.content);
      setErrorMessage('');
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    products,
    errorMessage,
    isLoading,
    fetchProducts,
  };
};

export default useProducts;
