import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useToast from "@/hooks/useToast";
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
  const { addToast } = useToast();

  const fetchCartItems = useCallback(async () => {
    try {
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    } catch {
      addToast({
        type: "error",
        message: "장바구니 상품을 불러오는데 실패했습니다.",
      });
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartItemContext value={{ cartItems, refetchCartItems: fetchCartItems }}>
      {children}
    </CartItemContext>
  );
}
