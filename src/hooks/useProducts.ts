import { useState, useEffect, useCallback } from 'react';
import { getProduct } from '../api/fetchProduct';
import { getCartItem } from '../api/fetchCart';
import type {
  CartResponse,
  CartItem,
  CategoryType,
  ProductWithCartInfo,
} from '../types/product';

export function useProducts(mappedSortType: string, category: CategoryType) {
  const [products, setproducts] = useState<ProductWithCartInfo[]>([]);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const product = await getProduct({
        page: 0,
        size: 20,
        sortBy: mappedSortType,
      });

      const cartResponse = await getCartItem({
        page: 0,
        size: 50,
        sortBy: 'desc',
      });

      const filteredCategory = product.content.filter(
        (item: ProductWithCartInfo) =>
          category === '전체' || item.category === category
      );

      const cartItemMap = new Map<number, CartItem>();
      cartResponse.content.forEach((item) => {
        cartItemMap.set(item.product.id, item);
      });

      const mapped = filteredCategory.map((item: ProductWithCartInfo) => {
        const cartItem = cartItemMap.get(item.id);

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          isInCart: cartItem ? true : false,
          cartId: cartItem?.id,
        };
      });
      setproducts(mapped);
      setCart({
        content: cartResponse.content,
        totalElements: cartResponse.totalElements,
      });
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

  return { products, cart, isLoading, isError, setIsError, fetchData };
}
