import { getCartItems } from "@/apis/cartItems/getCartItems";
import { CartItemType } from "@/types/cartItem";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface CartContextValue {
  cartItemData: CartItemType[];
  setCartItemData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useCartContext는 CartContext.Provider 안에서 사용되어야 합니다."
    );
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemData, setCartItemData] = useState<CartItemType[]>([]);

  useEffect(() => {
    async function fetchCartItems() {
      const cartItems = await getCartItems();
      setCartItemData(cartItems);
    }
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItemData,
        setCartItemData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
