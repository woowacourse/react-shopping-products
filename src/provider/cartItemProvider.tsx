import { getCartItems } from "@/apis/cartItem";
import { CartItems } from "@/types/products";
import { ReactNode, createContext, useEffect } from "react";
import { useState } from "react";

export const CartItemContext = createContext<CartItems[]>([]);
export const CartItemDispatchContext = createContext<React.Dispatch<React.SetStateAction<CartItems[]>>>(() => {});

const CartItemProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const getCartItemList = async () => {
    const res = await getCartItems();
    setCartItems(res);
  };

  useEffect(() => {
    getCartItemList();
  }, []);

  return (
    <CartItemContext.Provider value={cartItems}>
      <CartItemDispatchContext.Provider value={setCartItems}>{children}</CartItemDispatchContext.Provider>
    </CartItemContext.Provider>
  );
};

export default CartItemProvider;
