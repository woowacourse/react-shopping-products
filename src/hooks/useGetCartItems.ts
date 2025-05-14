import { useEffect, useState } from 'react';
import { ProductDataType } from '../types/product';

type cartDataType = {
  id: number;
  quantity: number;
  product: ProductDataType;
};

async function getCarts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=0&size=20`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic cm9zaWVsc2g6cGFzc3dvcmQ',
    },
  });

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

function useGetCarts() {
  const [carts, setCarts] = useState<cartDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getCarts();
        setCarts(data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, isError, carts };
}

export default useGetCarts;
