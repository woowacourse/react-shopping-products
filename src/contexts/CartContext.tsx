import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface CartContextType {
  cartLength: number | null;
  setCartLength: (length: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartLength, cartLengthSetter] = useState<number | null>(null);
  const setCartLength = useCallback((length: number) => {
    cartLengthSetter(length);
  }, []);
  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = useContext(CartContext);
  if (cartContext === undefined) {
    throw new Error("useCartContext는 프로바이더 안쪽에 위치를 해야 합니다.");
  }
  return cartContext;
};
