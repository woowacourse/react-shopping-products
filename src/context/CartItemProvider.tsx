import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { CartItem } from '../types/cart';
import { addCartItem, deleteCartItem, fetchCartItems } from '../api/cartItems';

interface CartItemContextProps {
  cartItems: CartItem[];
  addCart: (productId: number) => Promise<void>;
  deleteCart: (cartId: number) => Promise<void>;
}

export const CartItemsContext = createContext<CartItemContextProps>({} as CartItemContextProps);

export const CartItemProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getCartItems = async () => {
    try {
      setLoading(true);
      const fetchedCartItems = await fetchCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || error) return;

    getCartItems();
  }, []);

  const addCart = async (productId: number) => {
    try {
      await addCartItem(productId);

      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  const deleteCart = async (cartId: number) => {
    try {
      await deleteCartItem(cartId);

      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, addCart, deleteCart }}>
      {children}
    </CartItemsContext.Provider>
  );
};
