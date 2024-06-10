import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  patchCartItemQuantityChange,
} from "../api/cart";

interface CartContextType {
  cartItems: CartItemProps[];
  fetchCartItems: () => Promise<void>;
  addItemToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const addItemToCart = async (productId: number, quantity: number) => {
    try {
      await addCartItem(productId, quantity);
      await fetchCartItems();
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const updateCartItemQuantity = async (id: number, quantity: number) => {
    try {
      await patchCartItemQuantityChange(id, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  const removeCartItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove cart item", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, fetchCartItems, addItemToCart, updateCartItemQuantity, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
