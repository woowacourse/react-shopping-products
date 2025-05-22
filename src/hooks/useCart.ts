import { useState, useEffect, useCallback } from 'react';
import { getCartItem } from '../api/cart';
import { CartResponse, CartItem } from '../types/product';

export function useCart() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const cartData = await getCartItem();

      setCart(cartData);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const isInCart = useCallback((productId: number) => {
    if (!cart?.content) {
      return false;
    }

    return cart.content.some((item: CartItem) => item.product.id === productId)
  }, [cart]);

  const getCartItemId = useCallback((productId: number) => {
    if (!cart?.content) {
      return null;
    }

    const cartItem = cart.content.find((item: CartItem) => item.product.id === productId);

    return cartItem ? cartItem.id : null;
  }, [cart]);

  return { cart, isLoading, isError, setIsError, fetchCart, isInCart, getCartItemId };
}
