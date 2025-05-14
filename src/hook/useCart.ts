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
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/cart-items?page=0&size=20`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${import.meta.env.VITE_API_KEY}`
        }
      }
    );

    const results = await response.json();
    setCartData(results.content);
  };

  return { cartData, fetchCartData };
};

export default useCart;
