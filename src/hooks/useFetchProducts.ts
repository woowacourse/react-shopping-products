import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const size = page === 1 ? 20 : 4;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsPending(true);
        const fetchedProducts = await fetchProducts(page, size);
        setProducts((prevState) => [...prevState, ...fetchedProducts]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    getProducts();
  }, [page]);

  return { products, isError, isPending };
};

export default useFetchProducts;
