import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItemContextType {
  cartItems: CartItemType[];
  refetchCartItems: () => Promise<void>;
}
const CartItemContext = createContext<CartItemContextType>({
  cartItems: [],
  refetchCartItems: async () => {},
});

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error(
      "useCartItemContext must be used within a CartItemProvider"
    );
  }
  return context;
};

interface CartItemProviderProps {
  children: ReactNode;
}

export function CartItemProvider({ children }: CartItemProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    };

    fetchCartItems();
  }, []);

  const refetchCartItems = useCallback(async () => {
    const cartItems = await getCartItems();
    setCartItems(cartItems);
  }, []);

  return (
    <CartItemContext value={{ cartItems, refetchCartItems }}>
      {children}
    </CartItemContext>
  );
}
