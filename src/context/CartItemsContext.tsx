import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { getCartItems } from "../api";
import { useErrorContext } from "../hooks/useErrorContext";

export interface CartItemsContextType {
  cartItems: CartItem[];
  refreshCartItems: () => void;
}

export const CartItemsContext = createContext<CartItemsContextType | undefined>(
  undefined
);

interface CartItemsProviderProps {
  children: ReactNode;
}

export const CartItemsProvider: React.FC<CartItemsProviderProps> = ({
  children,
}) => {
  const { showError } = useErrorContext();

  const [toggle, setToggle] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCartItems = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setCartItems(cartItems);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      }
    };

    fetchCartItems();
  }, [toggle, showError]);

  return (
    <CartItemsContext.Provider value={{ cartItems, refreshCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
