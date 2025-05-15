import { useState, useEffect, useCallback } from 'react';
import { getProduct } from '../api/product';
import { getCartItem } from '../api/cart';
import type {
  ProductElement,
  CartResponse,
  CartItem,
  CategoryType,
} from '../types/product';

export function useProducts(mappedSortType: string, category: CategoryType) {
  const [data, setData] = useState<ProductElement[]>([]);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const product = await getProduct(mappedSortType);
      const cartRes = await getCartItem();

      const filteredCategory = product.content.filter(
        (item: ProductElement) =>
          category === '전체' || item.category === category
      );

      const mapped = filteredCategory.map((item: ProductElement) => {
        const cartItem = cartRes.content.find(
          (ci: CartItem) => ci.product.id === item.id
        );

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          isInCart: cartItem ? 1 : 0,
          cartId: cartItem?.id,
        };
      });

      setData(mapped);
      setCart(cartRes);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [mappedSortType, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, cart, isLoading, isError, setIsError, fetchData };
}
