import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/product';
import { Product } from '../types/Product.type';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page]);

  //   const fetchNextPage = () => {
  //     if (page < 21) {
  //       setPage((prevPage) => prevPage + 1);
  //       setLoading(true);
  //     }
  //   };

  return { products, loading, error, page };
}
