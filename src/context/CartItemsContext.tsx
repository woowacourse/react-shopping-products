import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";

type ItemId = {
  cartId: string;
  productId: string;
};

type CartItemsContextType = {
  cartItemsId: ItemId[];
  handleCartItemsId: (value: ItemId[]) => void;
};

export const CartItemsIdContext = createContext<
  CartItemsContextType | undefined
>(undefined);

export const CartItemsIdProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemsId, setCartItemsId] = useState<ItemId[]>([]);

  const handleCartItemsId = useCallback((itemIds: ItemId[]) => {
    setCartItemsId(itemIds);
  }, []);

  return (
    <CartItemsIdContext.Provider value={{ cartItemsId, handleCartItemsId }}>
      {children}
    </CartItemsIdContext.Provider>
  );
};

export const useCartItemsIdContext = () => {
  const context = useContext(CartItemsIdContext);
  if (!context) {
    throw new Error(
      "useCartItemsIdContext는 CartItemsIdProvider 안에서 사용해야 합니다."
    );
  }
  return context;
};
