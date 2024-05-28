import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsPending(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    getProducts();
  }, []);

  return { products, isError, isPending };
};

export default useFetchProducts;
