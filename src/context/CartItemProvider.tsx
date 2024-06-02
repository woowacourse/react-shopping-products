import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types/cart';
import { addCartItem, deleteCartItem, fetchCartItems } from '../api/cartItems';
import { ToastContext } from './ToastProvider';

interface CartItemContextProps {
  cartItems: CartItem[];
  addCart: (productId: number) => Promise<void>;
  deleteCart: (cartId: number) => Promise<void>;
}

export const CartItemsContext = createContext<CartItemContextProps>({} as CartItemContextProps);

export const CartItemProvider = ({ children }: PropsWithChildren) => {
  const { showToast } = useContext(ToastContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getCartItems = async () => {
    try {
      setLoading(true);
      const fetchedCartItems = await fetchCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        showToast(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || error) return;

    getCartItems();
  }, []);

  const addCart = async (productId: number) => {
    await addCartItem(productId);

    await getCartItems();
  };

  const deleteCart = async (cartId: number) => {
    await deleteCartItem(cartId);

    await getCartItems();
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, addCart, deleteCart }}>
      {children}
    </CartItemsContext.Provider>
  );
};
