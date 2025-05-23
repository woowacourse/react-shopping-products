import { useState, useEffect } from 'react';
import { Product } from '../types/product.type';
import { INITIAL_ERROR } from '../contexts/context.constant';
import fetchProducts from '../APIs/productApi';
import { ErrorState } from '../types/error.type';

export function useProductsFetch(sort: string, category: string) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);

  useEffect(() => {
    const params = { page: '0', size: '20', sort };
    const query = new URLSearchParams(params).toString();
    const endpoint =
      category === '전체'
        ? `/products?${query}`
        : `/products?${query}&category=${category}`;

    (async () => {
      setLoading(true);
      try {
        const { content } = await fetchProducts({ endpoint });
        setItems(content);
        setError(INITIAL_ERROR);
      } catch {
        setError({
          is: true,
          message: '상품을 불러오는 데 실패했습니다.',
        });
        setTimeout(() => setError(INITIAL_ERROR), 3000);
      } finally {
        setLoading(false);
      }
    })();
  }, [sort, category]);

  return { items, loading, error, setItems };
}
