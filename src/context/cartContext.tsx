import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../api/cart";

interface CartContextType {
  cartItems: CartItemProps[];
  fetchCartItems: () => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
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

  const updateCartItemQuantity = (id: number, quantity: number) => {
    console.log(`Updating cart item ${id} quantity to ${quantity}`);

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeCartItem = (id: number) => {
    console.log(`Removing cart item ${id}`);

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, fetchCartItems, updateCartItemQuantity, removeCartItem }}
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
