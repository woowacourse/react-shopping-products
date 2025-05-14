import { useEffect, useState } from 'react';
import { Product } from '../types/response';

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart-items?page=0&size=20`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${import.meta.env.VITE_API_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const results = await response.json();
      setCartData(results.content);
    } catch (error) {
      // 예외 처리 로직
      // Fallback page
    }
  };

  return { cartData, fetchCartData };
};

export default useCart;
