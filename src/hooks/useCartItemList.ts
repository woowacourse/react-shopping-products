import { useEffect, useState } from "react";

import { fetchCartItemList } from "../api/carItems";
import { CartItem } from "../interfaces/CartItem";

interface UseCartItemListResult {
  cartItemList: CartItem[];
  loading: boolean;
  error: unknown;
}

export default function useCartItemList(): UseCartItemListResult {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getCartItemList = async () => {
      try {
        setLoading(true);
        const data = await fetchCartItemList();
        setCartItemList(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCartItemList();
  }, []);

  return { cartItemList, loading, error };
}
